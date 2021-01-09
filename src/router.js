import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/utils'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: About,
      },
      {
        path: 'user',
        component: User,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/authentication',
    component: () => import('@/views/Authentication.vue'),
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
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser(router.$auth)
    if (!user) {
      return '/authentication'
    }
  }
  return true
})

export default router
