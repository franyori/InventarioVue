<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-lg"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar Almacen
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>
      <q-form id="form" @submit.prevent="addAlamacen()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="nombre_bodega"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Almacen']"
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
              v-model="descripcion_bodega"
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
              dense
              standout
              bg-color="accent"
              filled
              v-model="ubicacion_bodega"
              label="Ubicación"
              hint="Dirección"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba dirección']"
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
              v-model="theModel2"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(theModel2)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>
        <q-card-actions>
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
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
import { onUpdated, ref } from 'vue'
import { useAlmacenStore } from '../../stores/AlmcenStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useAlmacenStore()

const addAlamacen = async () => {
  const params = ref({
    nombre_bodega: nombre_bodega,
    descripcion_bodega: descripcion_bodega,
    ubicacion_bodega: ubicacion_bodega,
    status_bodega: theModel2
  })
  await store.AlmacenAdd(params.value)
  instance.proxy.$forceUpdate()

}

onUpdated(async()=>{
await store.AlmacenAll()
})

const nombre_bodega = ref('')
const descripcion_bodega = ref('')
const ubicacion_bodega = ref('')
const accept = ref(false)
const model = ref('')
const theModel2 = ref('')

const onReset = () => {
  nombre_bodega.value = null
  descripcion_bodega.value = null
  ubicacion_bodega.value = null
  theModel2.value = ''
}
</script>
