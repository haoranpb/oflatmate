import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/utils'
import { auth } from '@/firebaseConfig'
import store from '@/store'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  /*
    Check authentication status before route entering, vuex is lost after refresh
  */
  if (to.meta.requiresAuth && !store.state.user) {
    const user = await getCurrentUser(auth)
    if (!user) {
      return '/authentication'
    } else {
      store.commit('setUser', user)
    }
  }
})

export default router
