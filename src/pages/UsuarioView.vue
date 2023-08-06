<template>
    <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Usuarios
      </p>
    </div>
  </div>
  <div class="row">
    <ListUsuario />
    <AddUsuario />
  </div>
</q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import ListUsuario from '../components/Usuario/ListUsuarioView.vue'
import AddUsuario from '../components/Usuario/AddUsuarioView.vue'
import {useUsuarioStore} from '../stores/UsuarioStore'
import {usePersonaByIdStore} from '../stores/PersonaByIdStore'
import {useRolStore} from '../stores/RolStore'


const store = useUsuarioStore()
const storePersona = usePersonaByIdStore()
const storeRol = useRolStore()

onMounted(async()=>{
await store.UsuarioAll()
await storePersona.PersonaAll()
await storeRol.RolAll()
})
</script>
