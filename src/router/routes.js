
const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayoutNoLogin.vue'),
    children: [
      { path: '', component: () => import('../pages/IndexView.vue') }
    ]
  },
  

  {
    path: '/IndexPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: 'Persona', name:'personas', component: () => import('../pages/PersonaView.vue'),meta: { requiresAuth: false } },
      { path: 'Cliente', name:'clientes', component: () => import('../pages/ClienteView.vue'),meta: { requiresAuth: false } },
      { path: 'Proveedor', name:'proveedores', component: () => import('../pages/ProveedorView.vue'),meta: { requiresAuth: false } },
      { path: 'Categoria', name:'categorias', component: () => import('../pages/CategoriaView.vue'),meta: { requiresAuth: false } },
      { path: 'Rol', name:'roles', component: () => import('../pages/RolView.vue'),meta: { requiresAuth: false } },





    ]
  },

  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
