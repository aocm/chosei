
const routes = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/top.vue') },
      { path: 'user', component: () => import('pages/select-date.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error404.vue'),
  });
}

export default routes;
