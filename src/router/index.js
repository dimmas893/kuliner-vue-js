import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// import FoodDetail from '../views/FoodDetail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('../views/FoodView.vue')
  },
  {
    path: '/food/:id',
    name: 'FoodDetailView',
    component: () => import('../views/FoodDetail.vue')
  },

  {
    path: '/keranjang',
    name: 'Keranjang',
    component: () => import('../views/Keranjang.vue')
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: () => import('../views/PesananSukses.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
