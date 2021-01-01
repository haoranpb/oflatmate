import { createRouter, createWebHistory } from 'vue-router'
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
      },
    ],
  },
  {
    path: '/signin',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUp.vue'),
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

export default router
