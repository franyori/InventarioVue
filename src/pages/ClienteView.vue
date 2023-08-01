<template>
  <q-page class="fondo">
  <div class="row">
      <div class="col-12 q-ml-md q-mt-md text-bold text-primary text-h5">
        Clientes
    </div>
    </div>
  <div class="row">
    <ListCliente />
    <AddCliente  />
  </div>
</q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import ListCliente from '../components/Clientes/ListClienteView.vue'
import AddCliente from '../components/Clientes/AddClienteView.vue'
import {useClienteStore} from '../stores/ClienteStore'
import {  usePersonaByIdStore } from '../stores/PersonaByIdStore'

const store = useClienteStore()
const storePersona = usePersonaByIdStore()

onMounted(async()=>{
await store.ClienteAll()
await storePersona.PersonaAll()
});
</script>
