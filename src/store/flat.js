import { db, filedValDel } from '@/firebaseConfig'

const flat = {
  state() {
    return {
      flats: [],
      currentFlatId: null,
    }
  },
  mutations: {
    setCurrentFlatId(state, fid) {
      state.currentFlatId = fid
    },
    fetchFlats(state, uid) {
      // error in strict mode, querySnapshot is Proxy
      db.collection('flats')
        .where('member', 'array-contains', uid)
        .get()
        .then((querySnapshot) => {
          state.flats = querySnapshot.docs.map((doc) =>
            Object.assign({ id: doc.id }, doc.data())
          )
          // TODO: switch to last modified
          state.currentFlatId = querySnapshot.empty ? null : state.flats[0].id
        })
    },
    createFlat(state, { uid, flatName }) {
      db.collection('flats')
        .add({
          name: flatName,
          member: [uid],
        })
        .then((docRef) => {
          state.flats.push({
            id: docRef.id,
            name: flatName,
            member: [uid],
          })

          state.currentFlatId = docRef.id
        })
    },
    appendFlat(state, newFlat) {
      state.flats.push(newFlat)
    },
    // schedule, potentially move to a nested file
    genSchedule(state, scheduleObj) {
      state.flats.find(
        (flat) => flat.id == state.currentFlatId
      ).chore = scheduleObj

      db.collection('flats').doc(state.currentFlatId).update({
        chore: scheduleObj,
      })
    },
    updateSchedule(state, newSchedule) {
      // there should be a way to keep them in sync
      state.flats.find(
        (flat) => flat.id == state.currentFlatId
      ).chore.schedule = newSchedule

      db.collection('flats')
        .doc(state.currentFlatId)
        .update({ 'chore.schedule': newSchedule })
    },
    delScheduleAt(state, index) {
      state.flats
        .find((flat) => flat.id == state.currentFlatId)
        .chore.schedule.splice(index, 1)

      db.collection('flats')
        .doc(state.currentFlatId)
        .update({
          'chore.schedule': state.flats.find(
            (flat) => flat.id == state.currentFlatId
          ).chore.schedule,
        })
    },
    resetSchedule(state) {
      state.flats.find((flat) => flat.id == state.currentFlatId).chore = null

      db.collection('flats').doc(state.currentFlatId).update({
        chore: filedValDel,
      })
    },
  },
  actions: {
    fetchFlats({ commit, rootState }) {
      commit('fetchFlats', rootState.user.user.uid)
    },
    createFlat({ commit, rootState }, flatName) {
      commit('createFlat', { uid: rootState.user.user.uid, flatName })
    },
  },
  getters: {
    // getters shouldn't return Proxy type
    currentFlat(state) {
      return state.flats.find((flat) => flat.id == state.currentFlatId)
    },
    existFlat(state) {
      return (flatId) => state.flats.find((flat) => flat.id == flatId)
    },
  },
}

export default flat
