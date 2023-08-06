import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { Notify } from 'quasar'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

   const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (localStorage.getItem("token") && localStorage.getItem("usuario")) {
        next();
      } else {
        next("/");
        Notify.create({ message: 'Debes iniciar sesión para acceder a esta sección de la aplicación', type: 'negative', color: 'red-8', position: 'top-right'})

      }
    } else {
      next();
    }
  });

  return Router
})
