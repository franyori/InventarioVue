import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
export const usePersonaStore = defineStore('persona', {
  state: () => {
    return {
      Persona:[]
    }
  },

  getters: {
  },

  actions: {
    async PersonaAll () {
      try {
        let getAll = await axios.get(Global.url + 'persona/list', Headers)
        const resp = (this.Persona = getAll.data)
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
