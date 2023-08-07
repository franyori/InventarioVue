import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useEmpresaStore = defineStore('empresa', {
  state: () => {
    return {
      EmpresaId: ref({}),
      Empresa: ref([])
    }
  },

  getters: {},

  actions: {
    async EmpresaAll () {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let getAll = await axios.get(Global.url + 'empresa/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const resp = (this.Empresa = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async EmpresaAdd (params) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let add = await axios.post(Global.url + 'empresa/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Empresa Agregada',
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

    async EmpresaById (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let list = await axios.get(Global.url + 'empresa/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const respu = (this.EmpresaId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async EmpresaDelete (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        const lista = await axios.delete(
          Global.url + 'empresa/delete/' + `${id}`,
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
            message: 'Empresa Eliminada',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar empresa',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async EmpresaUpdate (params, id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let updateP = await axios.put(
          Global.url + 'empresa/update/' + `${id}`,
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
            message: 'Empresa Actualizada',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar la empresa',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
