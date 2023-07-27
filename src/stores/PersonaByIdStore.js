import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'

export const usePersonaByIdStore = defineStore('personaid', {
  state: () => {
    return {
      PersonaById:[]
    }
  },

  getters: {
  },

  actions: {
    async editPersona (req, res) {
        try {
          let list = await axios.get(Global.url + 'persona/show/' + `${req}`,Headers)
          const respu = (this.PersonaById = list.data)
        } catch (error) {
          console.log(error)
        }
      }
  }
})
