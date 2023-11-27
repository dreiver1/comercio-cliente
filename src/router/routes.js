const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'products', component: () => import('src/pages/products/ProductsPage.vue') },
      { path: 'addproduct', component: () => import('src/pages/products/AddProductPage.vue') },
      { path: 'putproduct', component: () => import('src/pages/products/PutProductPage.vue') },
      { path: 'pdv', component: () => import('src/pages/PdvPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
