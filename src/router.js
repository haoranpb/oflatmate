import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/utils'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import About from '@/views/About.vue'
import Flat from '@/views/Flat.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: About,
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
    component: () => import('@/views/Error.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/NotFound.vue'),
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
