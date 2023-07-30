import { ref } from 'vue'
import { Global } from '../config/Global'
import { Headers } from '../config/Headers'
import { Notify } from 'quasar'
import axios from 'axios'

class ProductoService {
  constructor () {
    this.Persona = ref([])
    this.editarPersona = ref({})
  }

  getPersona () {
    return this.Persona
  }

  getEditarPersona () {
    return this.editarPersona
  }

  async PersonaAll () {
    try {
      let getAll = await axios.get(Global.url + 'persona/list', Headers)
      const resp = (this.Persona.value = getAll.data)
    } catch (error) {
      console.log(error)
    }
  }

  async addPer (params) {
    try {
      const add = await axios.post(Global.url + 'persona/add', params, Headers)
      if (add.status === 200) {
        Notify.create({
          type: 'positive',
          message: 'Persona Agregada',
          color: 'positive',
          position: 'bottom-right'
        })
      }
    } catch (error) {
      console.log(error)
      Notify.create({
        type: 'warning',
        message: 'Error con el Servidor!',
        color: 'warning',
        position: 'center'
      })
    }
  }

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

  async editPersona (req, res) {
    try {
      let list = await axios.get(Global.url + 'persona/show/' + `${req}`,Headers)
      const respu = (this.editarPersona.value = list.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProductoService
