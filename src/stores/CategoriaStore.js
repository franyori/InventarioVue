import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const useCategoriaStore = defineStore('categoria', {
  state: () => {
    return {
      CategoriaId: ref({}),
      Categoria: ref([])
    }
  },

  getters: {},

  actions: {
    async CategoriaAll () {
      try {
        let getAll = await axios.get(Global.url + 'categoria/list', Headers)
        const resp = (this.Categoria = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async CategoriaAdd (params) {
      try {
        let add = await axios.post(
          Global.url + 'categoria/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Agregada',
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

    async CategoriaById (id) {
      try {
        let list = await axios.get(
          Global.url + 'categoria/show/' + `${id}`,
          Headers
        )
        const respu = (this.CategoriaId = list.data)
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

    async CategoriaUpdate (params, id) {
      try {
        let updateP = await axios.put(
          Global.url + 'categoria/update/' + `${id}`,
          params,
          Headers
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Actualizada',
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
