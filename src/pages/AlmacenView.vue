<template>
   <q-page class="fondo">
  <div class="row">
   
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-md q-pl-md">
        Almacen
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
import List from '../components/Almacen/ListAlmacenView.vue'
import Add from '../components/Almacen/AddAlmacenView.vue'
import {useAlmacenStore} from '../stores/AlmcenStore'
import { onMounted } from 'vue'

const store = useAlmacenStore()

onMounted(async()=>{
await store.AlmacenAll()
})
</script>
