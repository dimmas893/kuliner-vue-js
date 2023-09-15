import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/viewFE/HomeView.vue'
// import FoodDetail from '../views/FoodDetail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: guestMiddleware,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/viewBE/dashboard/index.vue'),
    beforeEnter: authMiddleware,
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('../views/viewFE/FoodView.vue')
  },
  {
    path: '/food/:id',
    name: 'FoodDetailView',
    component: () => import('../views/viewFE/FoodDetail.vue')
  },

  {
    path: '/keranjang',
    name: 'Keranjang',
    component: () => import('../views/viewFE/Keranjang.vue')
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: () => import('../views/viewFE/PesananSukses.vue')
  },
  {
    path: '/product-admin',
    name: 'productAdmin',
    component: () => import('../views/viewBE/product/Product.vue')
  },

  {
    path: '/product-admin-create',
    name: 'productAdminCreate',
    component: () => import('../views/viewBE/product/Create.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

function authMiddleware(to, from, next) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    // Redirect to the previous page if not authenticated
    router.go(-1);
  } else {
    next();
  }
}

function guestMiddleware(to, from, next) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn) {
    // Redirect to the previous page if already logged in
    router.go(-1);
  } else {
    next();
  }
}
