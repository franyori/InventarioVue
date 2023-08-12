<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar presentación
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>
      <q-form id="form" @submit.prevent="addPresent()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
            <q-input
              dense
              filled
              v-model="nombre_present"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba Presentación'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5

            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="abreviatura_present"
              label="Abreviatura"
              hint=" Abreviatura identificatoria"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba abreviatura']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="unidadMedidadId"
              :options="apilista"
              :option-label="
                apilista => (apilista === null ? null : apilista.nombre_unidad)
              "
              :option-value="
                apilista => (apilista === null ? null : apilista.id)
              "
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Unidad de medidad"
              hint="Seleccione unidad"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
              v-model="descripcion_present"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
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
              v-model="status_present"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_present)
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
import { computed, onUpdated, ref } from 'vue'
import {useUnidadMedidaStore} from '../../stores/UnidadMedidaStore'
import {usePresentacionStore} from '../../stores/PresentacionStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const storeUnidad  = useUnidadMedidaStore()
const store  = usePresentacionStore()

const apilista = computed(() =>storeUnidad.Umedida)

const nombre_present = ref('')
const descripcion_present = ref('')
const abreviatura_present = ref('')
const unidadMedidadId = ref('')
const accept = false
const model = ''
const status_present = ref('')

const onReset = () => {
  nombre_present.value = null
  descripcion_present.value = null
  unidadMedidadId.value = null
  abreviatura_present.value = null
  status_present.value = ''
}



const addPresent  = (async() =>{
  const params = ref({
  nombre_present: nombre_present,
  descripcion_present: descripcion_present,
  unidadMedidadId: unidadMedidadId,
  abreviatura_present: abreviatura_present,
  status_present: status_present
})
  await store.PresentacionAdd(params.value)
  onReset()
  instance.proxy.$forceUpdate()
})

onUpdated(async()=>{
  await store.PresentacionAll()
})

// const options  =ref(storeUnidad.Umedida)
// const filterFn  = (val, update) => {
//   if (val === '') {
//     update(() => {
//       options.value = storeUnidad.Umedida
//     })
//     return
//   }

//   update(() => {
//     const needle = val.toLowerCase()
//     options.value = storeUnidad.Umedida.filter(
//       v => v.toLowerCase().indexOf(needle) > -1
//     )
//   })
// }
</script>
