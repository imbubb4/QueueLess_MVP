import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Cliente
    {
      path: '/',
      name: 'home',
      component: () => import('@/presentation/views/client/HomeView.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('@/presentation/views/client/ConfirmView.vue'),
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('@/presentation/views/client/TicketView.vue'),
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/presentation/views/client/ServiceView.vue'),
    },
    {
      path: '/rating',
      name: 'rating',
      component: () => import('@/presentation/views/client/RatingView.vue'),
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('@/presentation/views/client/ThanksView.vue'),
    },
    {
      path: '/cancelled',
      name: 'cancelled',
      component: () => import('@/presentation/views/client/CancelledView.vue'),
    },
    // Admin
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/presentation/views/admin/AdminDashboard.vue'),
    },
    {
      path: '/admin/detail/:id',
      name: 'admin-detail',
      component: () => import('@/presentation/views/admin/AdminDetail.vue'),
      props: true,
    },
  ],
})

export default router
