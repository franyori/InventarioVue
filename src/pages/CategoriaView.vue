<template>
    <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Categorias
      </p>
    </div>
  </div>
  <div class="row">
    <ListCategoria />
    <AddCategoria />
  </div>
</q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import ListCategoria from '../components/Categorias/ListCategoriaView.vue'
import AddCategoria from '../components/Categorias/AddCategoriaView.vue'
import {useCategoriaStore} from '../stores/CategoriaStore'

const storeCategoria = useCategoriaStore()

onMounted(async()=>{
await storeCategoria.CategoriaAll()
})
</script>
