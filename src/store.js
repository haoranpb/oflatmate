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
          state.currentFlatId = state.flats ? null : state.flats[0].id
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
          state.flats.push({
            id: docRef.id,
            name: newFlatName,
            member: [state.user.uid],
          })
        })
    },
  },
  getters: {},
})

export default store
