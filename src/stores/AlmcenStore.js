import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useAlmacenStore = defineStore('almacen', {
  state: () => {
    return {
      AlmacenId: ref({}),
      Almacen: ref([])
    }
  },

  getters: {},

  actions: {
    async AlmacenAll () {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let getAll = await axios.get(Global.url + 'bodega/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const resp = (this.Almacen = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async AlmacenAdd (params) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let add = await axios.post(Global.url + 'bodega/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Almacen Agregado',
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

    async AlmacenById (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let list = await axios.get(Global.url + 'bodega/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const respu = (this.AlmacenId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async AlmacenDelete (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        const lista = await axios.delete(
          Global.url + 'bodega/delete/' + `${id}`,
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
            message: 'Almacen Eliminada',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar  el Almacen',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async AlmacenUpdate (params, id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let updateP = await axios.put(
          Global.url + 'bodega/update/' + `${id}`,
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
            message: 'Almacen Actualizado',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el Almacen',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
