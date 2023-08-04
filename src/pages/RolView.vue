<template>
    <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Roles
      </p>
    </div>
  </div>
  <div class="row">
    <ListRol />
    <AddRol />
  </div>
</q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import ListRol from '../components/Roles/ListRolView.vue'
import AddRol from '../components/Roles/AddRolView.vue'
import {useRolStore} from '../stores/RolStore'

const store = useRolStore()

onMounted(async()=>{
await store.RolAll()
})
</script>
