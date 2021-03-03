import { DEFAULT_SIGNIN_PATH } from '@/utils'
import store from '@/store'
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
        name: 'user',
        component: User,
        meta: { requiresAuth: true },
      },
      {
        path: 'flat',
        name: 'flat',
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

export default routes
