import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useRolStore = defineStore('rol', {
  state: () => {
    return {
      RolId: ref({}),
      Rol: ref([])
    }
  },

  getters: {},

  actions: {
    async RolAll () {
      try {
        let getAll = await axios.get(Global.url + 'rol/list', Headers)
        const resp = (this.Rol = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async RolAdd (params) {
      try {
        let add = await axios.post(
          Global.url + 'rol/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Rol agregado',
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

    async RolById (id) {
      try {
        let list = await axios.get(
          Global.url + 'rol/show/' + `${id}`,
          Headers
        )
        const respu = (this.RolId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async CategoriaDelete(id) {
      try {
        const lista = await axios.delete(
          Global.url + 'categoria/delete/' + `${id}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Eliminada',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar la categoria',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async RolUpdate (params, id) {
      try {
        let updateP = await axios.put(
          Global.url + 'rol/update/' + `${id}`,
          params,
          Headers
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Rol actualizado',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la categoria',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
})
