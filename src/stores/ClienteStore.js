import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useClienteStore = defineStore('cliente', {
  state: () => {
    return {
      ClienteId: ref({}),
      Cliente: ref([])
    }
  },

  getters: {},

  actions: {
    async ClienteAll () {
      try {
        let getAll = await axios.get(Global.url + 'cliente/list', Headers)
        const resp = (this.Cliente = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ClienteAdd (params) {
      try {
        let add = await axios.post(
          Global.url + 'cliente/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Cliente Agregado',
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

    async ClienteById (id) {
      try {
        let list = await axios.get(
          Global.url + 'cliente/show/' + `${id}`,
          Headers
        )
        const respu = (this.ClienteId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ClienteDelete(id) {
      try {
        const lista = await axios.delete(
          Global.url + 'cliente/delete/' + `${id}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Cliente Eliminada',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Este Cliente esta Asociado a un Proveedor',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async ClienteUpdate (params, id) {
      try {
        let updateP = await axios.put(
          Global.url + 'cliente/update/' + `${id}`,
          params,
          Headers
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Cliente Actualizado',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar el Cliente',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
