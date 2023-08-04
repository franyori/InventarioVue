<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar rol
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addRol()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="nombre_rol"
              standout
              bg-color="accent"
              label="Rol"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba rol']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="detalle_rol"
              label="Detalle"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
        </div>
        <q-card-actions>
          <q-btn no-caps label="Guardar" type="submit" color="primary" />
          <q-btn
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { ref,onUpdated} from 'vue'
import {useRolStore} from '../../stores/RolStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useRolStore()

const nombre_rol = ref('')
const  detalle_rol= ref('')

const addRol = (async()=>{
  const params = ref({
    nombre_rol: nombre_rol,
    detalle_rol: detalle_rol,
      })
await store.RolAdd(params.value)
instance.proxy.$forceUpdate()
onReset()

})

onUpdated(async () => {
await store.RolAll()
})

const onReset = () => {
  nombre_rol.value = null
  detalle_rol.value = null
};
</script>
