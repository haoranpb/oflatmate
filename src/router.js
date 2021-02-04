import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser, DEFAULT_SIGNIN_PATH } from '@/utils'
import store from '@/store.js'
import Layout from '@/others/Layout.vue'
import User from '@/views/User.vue'
import Home from '@/views/Home.vue'
import Flat from '@/views/Flat.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'user',
        component: User,
        meta: { requiresAuth: true },
      },
      {
        path: 'flat',
        component: Flat,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/authentication',
    component: () => import('@/views/Authentication.vue'),
    beforeEnter: () => {
      if (store.state.user) {
        return DEFAULT_SIGNIN_PATH
      }
    },
  },
  {
    path: '/error',
    component: () => import('@/others/Error.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/others/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  /*
    Check authentication status before route entering, vuex is lost after refresh
  */
  if (to.meta.requiresAuth && !store.state.user) {
    const user = await getCurrentUser(router.$firebase.auth())
    if (!user) {
      return '/authentication'
    } else {
      store.commit('setUser', user)
    }
  }
})

export default router
