import { createStore } from 'vuex'
import { db } from '@/firebaseConfig'

const store = createStore({
  state() {
    return {
      user: null,
      flats: [],
    }
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser
    },
    clearUser(state) {
      state.user = null
    },
    fetchFlats(state) {
      // error in strict mode, don't quite understand why
      db.collection('flats')
        .where('member', 'array-contains', state.user.uid)
        .get()
        .then((querySnapshot) => {
          state.flats = querySnapshot.docs.map((doc) =>
            Object.assign({ id: doc.id }, doc.data())
          )
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
})

export default store
