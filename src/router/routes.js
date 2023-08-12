
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
      { path: '/', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true }},
      { path: 'Persona', name:'personas', component: () => import('../pages/PersonaView.vue'),meta: { requiresAuth: true } },
      { path: 'Cliente', name:'clientes', component: () => import('../pages/ClienteView.vue'),meta: { requiresAuth: true } },
      { path: 'Proveedor', name:'proveedores', component: () => import('../pages/ProveedorView.vue'),meta: { requiresAuth: true } },
      { path: 'Categoria', name:'categorias', component: () => import('../pages/CategoriaView.vue'),meta: { requiresAuth: true } },
      { path: 'Rol', name:'roles', component: () => import('../pages/RolView.vue'),meta: { requiresAuth: true } },
      { path: 'Usuario', name:'usuarios', component: () => import('../pages/UsuarioView.vue'),meta: { requiresAuth: true } },
      { path: 'Empresa', name:'empresas', component: () => import('../pages/EmpresaView.vue'),meta: { requiresAuth: true } },
      { path: 'Almacen', name:'almacens', component: () => import('../pages/AlmacenView.vue'),meta: { requiresAuth: true } },
      { path: 'UnidadMedida', name:'medida', component: () => import('../pages/UnidadMedidadView.vue'),meta: { requiresAuth: true } },
      { path: 'PresentacionProd', name:'presentaciones', component: () => import('../pages/PresentacionProdView.vue'),meta: { requiresAuth: true } },

    ]
  },

  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
