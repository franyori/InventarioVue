<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar categoria
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addCategoria()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="nombre_categoria"
              standout
              bg-color="accent"
              label="Categoria"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba categoria']"
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
              v-model="detalle_categoria"
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

        <div class="row q-col-gutter-md">
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-toggle
              left-label
              icon="task_alt"
              true-value="ACTIVO"
              false-value="INACTIVO"
              v-model="status_categoria"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione un estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_categoria)
                }}</q-chip></strong
              >
            </div>
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
import {useCategoriaStore} from '../../stores/CategoriaStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const storeCategoria = useCategoriaStore()

const shape = ref('line')
const nombre_categoria = ref('')
const detalle_categoria = ref('')
const model = ref('')
const status_categoria = ref('')

const addCategoria = (async()=>{
  const params = ref({
        nombre_categoria: nombre_categoria,
        detalle_categoria: detalle_categoria,
        status_categoria: status_categoria
      })
await storeCategoria.CategoriaAdd(params.value)
instance.proxy.$forceUpdate()

})

onUpdated(async () => {
await storeCategoria.CategoriaAll()
})

const onReset = () => {
  nombre_categoria.value = null
  detalle_categoria.value = null
  status_categoria.value = ''
};
</script>
