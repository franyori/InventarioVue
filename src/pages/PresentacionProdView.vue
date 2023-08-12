<template>
  <q-page class="fondo">
    <div class="row">
      <div class="col-12">
        <p class="text-bold text-primary text-h5 q-pt-md q-pl-md">
          Presentaciones
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
import List from '../components/PresentacionProd/ListPresentacionView.vue'
import Add from '../components/PresentacionProd/AddPresentacionView.vue'
import {usePresentacionStore} from '../stores/PresentacionStore'
import {useUnidadMedidaStore} from '../stores/UnidadMedidaStore'

const store = usePresentacionStore()
const storeUnidad = useUnidadMedidaStore()

onMounted(async()=>{
await store.PresentacionAll()
await storeUnidad.UmedidaAll()
})
</script>