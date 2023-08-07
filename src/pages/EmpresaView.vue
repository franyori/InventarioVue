<template>
  <q-page class="fondo">
    <div class="row">
      <div class="col-12">
        <p class="text-bold text-primary text-h5 q-pl-md">
          Empresas
        </p>
      </div>
    </div>
    <div class="row">
      <List />
      <Add />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import List from '../components/Empresas/ListEmpresaView.vue'
import Add from '../components/Empresas/AddEmpresaView.vue'
import {useEmpresaStore} from '../stores/EmpresaStore'
const store = useEmpresaStore()

onMounted(async() => {
await store.EmpresaAll()
})
</script>
