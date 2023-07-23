<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-ml-md q-mt-md text-bold text-primary text-h5">
        Personas
      </div>
    </div>
  <div class="row">
      <List :apiList="ListPersona" /> 
      <Add /> 
  </div>
  </q-page>
</template>

<script setup>
import List from '../components/Personas/ListView.vue'
import Add from '../components/Personas/AddView.vue'
import PersonaService from '../services/PersonaService.js'
import { onMounted, onUpdated} from 'vue'

const PerService = new PersonaService()
const ListPersona = PerService.getPersona()

 onMounted(async () => {
   await PerService.PersonaAll()
   console.log("mount")
 })

onUpdated(async () =>{
await PerService.PersonaAll()
console.log('update')
})


</script>
