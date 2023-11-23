const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/auth/LoginPage.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'products', component: () => import('src/pages/products/ProductsPage.vue') },
      { path: 'addproduct', component: () => import('src/pages/products/AddProductPage.vue') },
      { path: 'putproduct', component: () => import('src/pages/products/PutProductPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
