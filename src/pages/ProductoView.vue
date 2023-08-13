<template>
  <q-page class="fondo">
    <div class="row">
      <div class="col-12">
        <p class="text-bold text-primary text-h5 q-pt-md q-pl-md">
          Productos
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
import List from '../components/Producto/ListViewProducto.vue'
import Add from '../components/Producto/AddViewProducto.vue'
import { useProductoStore } from '../stores/ProductoStore'
import { useCategoriaStore } from '../stores/CategoriaStore'
import { useAlmacenStore } from '../stores/AlmcenStore'
import { usePresentacionStore } from '../stores/PresentacionStore'

const storeCategoria = useCategoriaStore()
const store = useProductoStore()
const storeAlmacen = useAlmacenStore()
const storePresentacion = usePresentacionStore()

onMounted(async () => {
  await store.ProductoAll()
  await storeCategoria.CategoriaAll()
  await storeAlmacen.AlmacenAll()
  await storePresentacion.PresentacionAll()
})
</script>
