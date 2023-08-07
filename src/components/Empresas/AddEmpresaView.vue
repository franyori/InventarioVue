<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar empresa
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addEmpresa()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              min="0"
              type="number"
              filled
              v-model="rif_empre"
              standout
              bg-color="accent"
              label="Rif"
              hint="Documento Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Documento']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              filled
              v-model="nombre_empre"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              filled
              v-model="representante_empre"
              standout
              bg-color="accent"
              label="Representante"
              hint="Representante Legal"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba  Representante'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              filled
              type="tel"
              v-model="tlf_local_empre"
              standout
              bg-color="accent"
              label="Teléfono local"
              hint="Conctacto valido"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba numero valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              filled
              type="tel"
              v-model="tlf_celular_empre"
              standout
              bg-color="accent"
              label="Teléfono celular"
              hint="Teléfono de conctacto"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba telefono valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              filled
              v-model="correo_empre"
              type="email"
              standout
              bg-color="accent"
              label="Correo"
              hint="Dirección  Electronica"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba Correo valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="tipo_empre"
              label="Tipo de empresa"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba tipo de empresa'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="direccion_empre"
              standout
              bg-color="accent"
              label="Dirección"
              hint="Dirección de ubicación"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba ubicación']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
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
import { useEmpresaStore } from '../../stores/EmpresaStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useEmpresaStore()

const nombre_empre = ref('')
const rif_empre = ref('')
const representante_empre = ref('')
const direccion_empre = ref('')
const tlf_local_empre = ref('')
const tlf_celular_empre = ref('')
const correo_empre = ref('')
const porltal_web_empre = ref('')
const tipo_empre = ref('')
const model = ref('')

const addEmpresa = async () => {
  let params = ref({
    nombre_empre: nombre_empre,
    rif_empre: rif_empre,
    representante_empre: representante_empre,
    direccion_empre: direccion_empre,
    tlf_local_empre: tlf_local_empre,
    tlf_celular_empre: tlf_celular_empre,
    correo_empre: correo_empre,
    porltal_web_empre: porltal_web_empre,
    tipo_empre: tipo_empre
  })
  await store.EmpresaAdd(params.value)
  instance.proxy.$forceUpdate()
  onReset()
}

onUpdated(async () => {
  await store.EmpresaAll()
})

const onReset = () => {
  nombre_empre.value = null
  rif_empre.value = null
  representante_empre.value = null
  direccion_empre.value = null
  tlf_local_empre.value = null
  tlf_celular_empre.value = null
  correo_empre.value = null
  porltal_web_empre.value = null
  tipo_empre.value = null
}
</script>
