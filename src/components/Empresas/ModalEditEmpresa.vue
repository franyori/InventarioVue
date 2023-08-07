<template>
  <q-dialog
    v-model="persistente"
    :model-value="props.persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      flat
      class="text-primary bg-white"
      style="width: 500px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="updateEmpresa(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <q-input
                disable
                dense
                filled
                v-model="store.EmpresaId.nombre_empre"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba un nombre']"
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
                v-model="store.EmpresaId.representante_empre"
                standout
                bg-color="accent"
                label="Representante"
                hint="Representante legal"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba representante'
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
                v-model="store.EmpresaId.tlf_local_empre"
                standout
                bg-color="accent"
                label="Teléfono local"
                hint="Teléfono local valido"
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
                v-model="store.EmpresaId.tlf_celular_empre"
                standout
                bg-color="accent"
                label="Teléfono celular"
                hint="Teléfono de Conctacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Telefono Valido'
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
                v-model="store.EmpresaId.correo_empre"
                type="email"
                standout
                bg-color="accent"
                label="Correo"
                hint="Dirección Electronica"
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
                v-model="store.EmpresaId.tipo_empre"
                label="Tipo de empresa"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba el tipo de empresa'
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
                v-model="store.EmpresaId.direccion_empre"
                standout
                bg-color="accent"
                label="Dirección"
                hint="Dirección de Ubicación"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba ubicación']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn no-caps label="Guardar" type="submit" color="primary" />
            <q-btn
              no-caps
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              @click="closeModal()"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref} from 'vue'
import {useEmpresaStore} from '../../stores/EmpresaStore'

const store = useEmpresaStore()

const props = defineProps({
  persistent:Boolean
})

const emit = defineEmits(['closeModel'])
const persistente = ref(props.persistent)

const updateEmpresa = (async()=>{
  const params = ref({
        // nombre_empre: this.apiedit.nombre_empre,
        representante_empre: store.EmpresaId.representante_empre,
        direccion_empre: store.EmpresaId.direccion_empre,
        tlf_local_empre: store.EmpresaId.tlf_local_empre,
        tlf_celular_empre: store.EmpresaId.tlf_celular_empre,
        correo_empre: store.EmpresaId.correo_empre,
        porltal_web_empre: store.EmpresaId.porltal_web_empre,
        tipo_empre: store.EmpresaId.tipo_empre
      })
  const id = ref(store.EmpresaId.id)

await store.EmpresaUpdate(params.value, id.value)
})

const closeModal = ()=> {
      emit('closeModel', false)
}
</script>
