<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Categorias
      </p>
    </div>
  </div>
  <div class="row">
    <List />
    <Add />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import List from '../components/Categorias/ListCategoriaView.vue'
import Add from '../components/Categorias/AddCategoriaView.vue'
import {useCategoriaStore} from '../stores/CategoriaStore'

const storeCategoria = useCategoriaStore()

onMounted(async()=>{
await storeCategoria.CategoriaAll()
})
</script>
