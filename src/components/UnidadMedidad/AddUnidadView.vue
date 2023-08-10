<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar unidad de medida
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>
      <q-form id="form" @submit.prevent="addUnidad()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="nombre_unidad"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba unidad']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="descripcion_unidad"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
            "
          >
            <q-input
              type="number"
              min="0"
              dense
              standout
              bg-color="accent"
              filled
              v-model="cantidad_unidad"
              label="Cantidad"
              hint="Cantidad contenidad en la unidad"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba cantidad']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
            "
          >
            <q-toggle
              left-label
              icon="task_alt"
              true-value="ACTIVO"
              false-value="INACTIVO"
              v-model="status_unidad"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_unidad)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>
        <q-card-actions>
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn no-caps label="Limpiar" type="reset" color="primary" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { onUpdated, ref } from 'vue'
import {useUnidadMedidaStore} from '../../stores/UnidadMedidaStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useUnidadMedidaStore()

const nombre_unidad = ref('')
const descripcion_unidad = ref('')
const cantidad_unidad = ref('')
const accept = ref(false)
const model = ref(null)
const status_unidad = ref('')

const addUnidad = (async()=>{
  const params = ref({
  nombre_unidad: nombre_unidad,
  descripcion_unidad: descripcion_unidad,
  cantidad_unidad: cantidad_unidad,
  status_unidad: status_unidad
})
await store.UmedidaAdd(params.value)
onReset()
instance.proxy.$forceUpdate()

})

onUpdated(async()=>{
  await store.UmedidaAll()
})

const onReset = () => {
  nombre_unidad.value = null
  descripcion_unidad.value = null
  cantidad_unidad.value = null
  status_unidad.value = ''
}


</script>
