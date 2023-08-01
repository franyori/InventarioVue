import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useProveedorStore = defineStore('proveedor', {
  state: () => {
    return {
      ProvedorId: ref({}),
      Proveedor: ref([])
    }
  },

  getters: {},

  actions: {
    async ProveedorAll () {
      try {
        let getAll = await axios.get(Global.url + 'proveedor/list', Headers)
        const resp = (this.Proveedor = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ProveedorAdd (params) {
      try {
        let add = await axios.post(
          Global.url + 'proveedor/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Proveedor Agregado',
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

    async ProveedorById (id) {
      try {
        let list = await axios.get(
          Global.url + 'proveedor/show/' + `${id}`,
          Headers
        )
        const respu = (this.ProvedorId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async ProveedorDelete(id) {
      try {
        const lista = await axios.delete(
          Global.url + 'proveedor/delete/' + `${id}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Proveedor Eliminado',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Este Proveedor esta Asociado a una Empresa',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async ProveedorUpdate (params, id) {
      try {
        let updateP = await axios.put(
          Global.url + 'proveedor/update/' + `${id}`,
          params,
          Headers
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Proveedor Actualizado',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar el Proveedor',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
