import { defineStore } from 'pinia'
import { Global } from 'src/config/Global'
import { Headers } from 'src/config/Headers'
import axios from 'axios'
import { ref, provide } from 'vue'
import { Notify } from 'quasar'

export const useUsuarioStore = defineStore('usuario', {
  state: () => {
    return {
      UsuarioId: ref({}),
      Usuario: ref([]),
      Token: ref(''),
      UsuarioToken: ref('')
    }
  },
  getters: {},

  actions: {
    async UsuarioAll () {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let getAll = await axios.get(Global.url + 'usuario/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const resp = (this.Usuario = getAll.data)
      } catch (error) {
        console.log(error)
      }
    },

    async UsuarioAdd (params) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let add = await axios.post(Global.url + 'usuario/add', params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Usuario agregado',
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
    async UsuarioLogin (params) {
      try {
        let add = await axios.post(Global.url + 'auth/auth', params, Headers)
        if (add.status === 200) {
          localStorage.setItem('token', add.data.accesToken)
          this.Token = localStorage.getItem('token')
          localStorage.setItem('usuario', add.data.usuarioToken)
          this.UsuarioToken = localStorage.getItem('usuario')

          Notify.create({
            type: 'positive',
            message: 'Inicio de sesión exitoso',
            color: 'positive',
            position: 'top-right'
          })
        }
      } catch (error) {
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async UsuarioById (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let list = await axios.get(Global.url + 'usuario/show/' + `${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: 'Bearer ' + newToken
          }
        })
        const respu = (this.UsuarioId = list.data)
      } catch (error) {
        console.log(error)
      }
    },

    async UsuarioDelete (id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        const lista = await axios.delete(
          Global.url + 'usuario/delete/' + `${id}`,
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
            message: 'Usuario Eliminado',
            color: 'positive',
            position: 'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar el usuario',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async RolUpdate (params, id) {
      try {
        var token = localStorage.getItem('token') || ''
        const newToken = token.replace('"', ' ')
        let updateP = await axios.put(
          Global.url + 'rol/update/' + `${id}`,
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
