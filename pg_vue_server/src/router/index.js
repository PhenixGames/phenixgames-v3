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
    component: () => import('../views/login/Login.vue')
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
  },
  {
    path: '/namechooser',
    name: 'Namechooser',
    component: () => import('../views/login/Namechooser.vue')
  },
  {
    path: '/spawnchooser',
    name: 'Spawnchooser',
    component: () => import('../views/login/Spawnchooser.vue')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/gasstation',
    name: 'Gasstation',
    component: () => import('../views/Gasstation.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
