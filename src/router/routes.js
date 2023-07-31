
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Persona', name:'personas', component: () => import('../pages/PersonaView.vue') },
      { path: 'Cliente', name:'clientes', component: () => import('../pages/ClienteView.vue') },


    ]
  },

  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
