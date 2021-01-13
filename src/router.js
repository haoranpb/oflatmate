import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/utils'
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
      if (router.app.config.globalProperties.$user) {
        return '/user'
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
    Check authentication status before route entering.
    Also make user always accessible in `this.$user`.
  */
  if (to.meta.requiresAuth && !router.app.config.globalProperties.$user) {
    const user = await getCurrentUser(
      router.app.config.globalProperties.$firebase.auth()
    )
    if (!user) {
      return '/authentication'
    } else {
      router.app.config.globalProperties.$user = user
    }
  }
})

export default router
