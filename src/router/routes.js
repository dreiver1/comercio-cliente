const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/auth/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/auth/LoginPage.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: 'products', name: 'products', component: () => import('src/pages/products/ProductsPage.vue') },
      { path: 'addproduct', name: 'addProducts', component: () => import('src/pages/products/AddProductPage.vue') },
      { path: 'putproduct', name: 'putProducts', component: () => import('src/pages/products/PutProductPage.vue') },
      { path: 'pdv', component: () => import('src/pages/PdvPage.vue') },
      {
        path: 'users/',
        children: [
          { path: '', name: 'users', component: () => import('src/pages/auth/UsersPage.vue') },
          { path: 'create', name: 'createUser', component: () => import('src/pages/auth/CreateUserPage.vue') },
          { path: 'edit', name: 'editUser', component: () => import('src/pages/auth/EditUserPage.vue') }
        ]
      }
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
