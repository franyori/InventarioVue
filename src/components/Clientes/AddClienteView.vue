<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar cliente
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Tipo cliente</p>
        </div>
      </div>
      <q-form @submit.prevent="addCliente()" @reset="onReset">
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="N"
                label="Persona Natural"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="J"
                label="Persona Juridica"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Persona</p>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-select
              dense
              filled
              v-model="persona"
              :options="apiList"
              :option-label="
                apiList => (apiList === null ? null : apiList.nombres_per)
              "
              :option-value="apiList => (apiList === null ? null : apiList.id)"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Persona"
              hint="Seleccione Persona"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
          >
            <q-input
              dense
              filled
              v-model="detalle"
              standout
              bg-color="accent"
              label="Detalle"
              hint="Detalle Cliente"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-12 text-left q-pt-md">
          <p class="text-subtitle2">Estado cliente</p>
        </div>
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="status"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="status"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-pt-md">
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { computed, ref,onUpdated } from "vue"
import {  usePersonaByIdStore } from '../../stores/PersonaByIdStore'
import {useClienteStore} from '../../stores/ClienteStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const storeCliente = useClienteStore()
const store = usePersonaByIdStore()

const apiList = computed(()=> store.Persona)
const shape = ref('N')
const detalle = ref('')
const persona =  ref('')
const status  = ref('ACTIVO')
const accept  = ref(false)

 const addCliente = (async () => {
  const params = ref({
       personaId : persona,
       status_client: status,
       detalle_client: detalle,
       tipo_client: shape,
      })
  await storeCliente.ClienteAdd(params.value) 
  instance.proxy.$forceUpdate()
  onReset()
 })

 onUpdated(async () => {
await storeCliente.ClienteAll()
})

 const onReset = () => {
   detalle.value = null
   persona.value = null
   status.value = 'ACTIVO'
   shape.value = 'N'
 };
</script>
