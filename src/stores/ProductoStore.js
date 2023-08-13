import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useProductoStore = defineStore('producto', {
  state: () => {
    return {
      ProductoId: ref({}),
      Producto: ref([])
    }
  },

  getters: {},

  actions: {
    async ProductoAll () {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let getAll = await axios.get(Global.url + 'producto/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const resp = (this.Producto = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ProductoAdd (params) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let add = await axios.post(Global.url + 'producto/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto agregado',
            color: 'positive'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async ProductoById (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let list = await axios.get(Global.url + 'producto/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const respu = (this.ProductoId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ProductoDelete (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        const lista = await axios.delete(
          Global.url + 'producto/delete/' + `${id}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken
            }
          }
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto Eliminado',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar el producto',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async ProductoUpdate (params, id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let updateP = await axios.put(
          Global.url + 'producto/update/' + `${id}`,
          params,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + newToken
            }
          }
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto actualizado',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el producto',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
