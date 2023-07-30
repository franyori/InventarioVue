<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-ml-md q-mt-md text-bold text-primary text-h5">
        Personas
      </div>
    </div>
  <div class="row">
      <List /> 
      <Add /> 
  </div>
  </q-page>
</template>

<script setup>
import List from '../components/Personas/ListView.vue'
import Add from '../components/Personas/AddView.vue'
import { onMounted,provide} from 'vue'
import {  usePersonaByIdStore } from '../stores/PersonaByIdStore';
const store = usePersonaByIdStore()
//provide('data',ListPersona)

 onMounted(async () => {
await store.PersonaAll()
 });

 
</script>
