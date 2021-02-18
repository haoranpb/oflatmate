import { createStore } from 'vuex'
import { db } from '@/firebaseConfig'

const store = createStore({
  state() {
    return {
      user: null,
      flats: [],
      currentFlatId: null,
    }
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser
    },
    clearUser(state) {
      state.user = null
    },
    setCurrentFlatId(state, fid) {
      state.currentFlatId = fid
    },
    fetchFlats(state) {
      // error in strict mode, querySnapshot is Proxy
      db.collection('flats')
        .where('member', 'array-contains', state.user.uid)
        .get()
        .then((querySnapshot) => {
          state.flats = querySnapshot.docs.map((doc) =>
            Object.assign({ id: doc.id }, doc.data())
          )
          // TODO: switch to last modified
          state.currentFlatId = querySnapshot.empty ? null : state.flats[0].id
        })
    },
    createFlat(state, newFlatName) {
      db.collection('flats')
        .add({
          name: newFlatName,
          creator: state.user.uid,
          member: [state.user.uid],
        })
        .then((docRef) => {
          // duplicate code with appendFlat, consider make it action
          state.flats.push({
            id: docRef.id,
            name: newFlatName,
            member: [state.user.uid],
          })

          state.currentFlatId = docRef.id
        })
    },
    appendFlat(state, newFlat) {
      state.flats.push(newFlat)
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
})

export default store
