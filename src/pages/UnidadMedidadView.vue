<template>
  <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-md q-pl-md">
        Unidad de medidas
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
import List from '../components/UnidadMedidad/ListUnidadView.vue'
import Add from '../components/UnidadMedidad/AddUnidadView.vue'
import {useUnidadMedidaStore} from '../stores/UnidadMedidaStore'
import { onMounted } from 'vue'

const store = useUnidadMedidaStore()

onMounted(async()=>{
  await store.UmedidaAll()
})
</script>
