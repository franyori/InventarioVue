<template>
  <q-page class="flex flex-center">  
  <div class="q-pl-xl q-pr-xl q-pb-xl bg-light-blue-2" style="border-radius: 8px; width: 30vw; ">
    <p class="text-h6 text-center q-pa-md text-primary">Acceso</p>
    <form @submit.prevent.stop="Login" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-input
        standout
        dense
        type="text"
        bg-color="grey-2"
        input-class="text-black"
        v-model="usuario"
        label="Usuario *"
        hint="Usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su usuario']"
      />

      <q-input
        standout
        type="password"
        dense
        bg-color="grey-2"
        input-class="text-black"
        v-model="password"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su contraseña']"
      />

      <div align="center">
        <q-btn padding="2px 52px 2px 52px" no-caps dense label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn padding="2px 52px 2px 52px" :loading="loading" no-caps dense label="Entrar" type="submit" color="primary" />
      </div>
    </form>
  </div>
  </q-page>
</template>

<script setup>
import { useUsuarioStore } from '../stores/UsuarioStore'
import { ref } from 'vue';
import {useRouter} from 'vue-router'

const router = useRouter()
const store = useUsuarioStore()

const loading = ref(false)
const usuario = ref('')
const password = ref('')

const Login = (async()=>{
  loading.value = true
  const params = ref({
    usuario: usuario,
    password: password,
  
      })
await store.UsuarioLogin(params.value).then(()=> router.push("/IndexPage"))
  loading.value = false
})
const onReset = () =>{
usuario.value = null
password.value = null
     
    }
</script>