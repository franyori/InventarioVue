<template>
  <q-page class="fondo">
    <div class="row">
      <div
        class="
      col-12 q-ml-md q-mt-md text-bold text-primary text-h5"
      >
        Proveedores
      </div>
    </div>
    <div class="row">
      <List />
      <Add />
    </div>
  </q-page>
</template>

<script setup>
import List from '../components/Proveedor/ListViewProveedor.vue'
//import Add from '../components/Proveedor/Add.vue'
</script>
