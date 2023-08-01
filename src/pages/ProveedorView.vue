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
import { onMounted } from 'vue'
import List from '../components/Proveedor/ListViewProveedor.vue'
import Add from '../components/Proveedor/AddViewProveedor.vue'
import {useProveedorStore} from '../stores/ProveedorStore'
import {usePersonaByIdStore} from '../stores/PersonaByIdStore'
import { useEmpresaStore } from '../stores/EmpresaStore'

const storePersona = usePersonaByIdStore()
const store = useProveedorStore()
const storeEmpresa = useEmpresaStore()

onMounted(async()=>{
await store.ProveedorAll()
await storePersona.PersonaAll()
await storeEmpresa.EmpresaAll()
});

</script>
