import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'

export const usePersonaByIdStore = defineStore('personaid', {
  state: () => {
    return {
      PersonaById:ref([]),
      Persona:ref([])
    }
  },

  getters: {
  },

  actions: {

    async PersonaAll () {
      try {
        let getAll = await axios.get(Global.url + 'persona/list', Headers)
        const resp = (this.Persona = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async editPersona (req, res) {
        try {
          let list = await axios.get(Global.url + 'persona/show/' + `${req}`,Headers)
          const respu = (this.PersonaById = list.data)
        } catch (error) {
          console.log(error)
        }
      },

      async deletePersona (req, res) {
        try {
          const lista = await axios.delete(Global.url + 'persona/delete/' + `${req}`,Headers)
          if (lista.status === 200) {
            Notify.create({
              type: 'positive',
              message: 'Persona Eliminada!',
              color: 'positive',
              position: 'center'
            })
          }
        } catch (error) {
          console.log(error)
          Notify.create({
            type: 'warning',
            message: 'Esta Empresa esta Asociada A un Proveedor!',
            color: 'warning',
            position: 'center'
          })
        }
      }
  }
})
