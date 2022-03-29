import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('../views/AboutView.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/hud',
    name: 'Hud',
    component: () => import('../views/Hud.vue')
  },
  {
    path: '/deathscreen',
    name: 'Deathscreen',
    component: () => import('../views/Deathscreen.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
