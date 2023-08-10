import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useUnidadMedidaStore = defineStore('medida', {
  state: () => {
    return {
      UmedidaId: ref({}),
      Umedida: ref([])
    }
  },

  getters: {},

  actions: {
    async UmedidaAll () {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let getAll = await axios.get(Global.url + 'unidad/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const resp = (this.Umedida = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async UmedidaAdd (params) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let add = await axios.post(Global.url + 'unidad/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Unidad de Medida Agregada',
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

    async UmedidaById (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let list = await axios.get(Global.url + 'unidad/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const respu = (this.UmedidaId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async UmedidaDelete (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        const lista = await axios.delete(
          Global.url + 'unidad/delete/' + `${id}`,
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
            message: 'Unidad de medida eliminada',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar la unidad de medidad',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async UmedidaUpdate (params, id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let updateP = await axios.put(
          Global.url + 'unidad/update/' + `${id}`,
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
            message: 'Unidad de medida actualizada',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
