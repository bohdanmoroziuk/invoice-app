const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/invoice/:id',
    name: 'invoice',
    props: true,
    component: () => import('@/views/Invoice.vue'),
  },
];

export default routes;
