<template>
  <q-dialog
    v-model="persistente"
    :model-value="props.persistent"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      flat
      class="text-primary bg-white"
      style="width: 700px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar persona</div>
        <br />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent.stop="UpdatePersona(), closemodal()">
          <div class="row q-col-gutter-md q-pb-md">
            <div class="q-gutter-md">
              <q-radio
                dense
                v-model="store.PersonaById.tipo_per"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="N"
                label="Persona Natural"
              />
              <q-radio
                dense
                v-model="store.PersonaById.tipo_per"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="J"
                label="Persona Juridica"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                denseS
                filled
                v-model="store.PersonaById.nombres_per"
                standout
                bg-color="accent"
                label="Nombres"
                hint="Primero y segundo"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba sus Nombres'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="store.PersonaById.apellidos_per"
                label="Apellidos"
                hint="Primero y segundo"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba sus Apellidos'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
          </div>
          <div
            class="
              col-12
              text-no-wrap
             q-col-gutter-x-md
            "
          >
            <p class="col text-weight-medium">Documento</p>
          </div>
          <div class="row q-col-gutter-md">
            <div
              class="
              col-12 col-md-2
            "
            >
              <q-select
                borderless
                dense
                filled
                v-model="store.PersonaById.nacionalidad_per"
                :options="options"
                bg-color="accent"
                :rules="[
                  val => (val && val.length > 0) || 'Nacionalidad invalidad'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="wallet" />
                </template>
              </q-select>
            </div>
            <div
              class="
              col-12 col-md-4
            "
            >
              <q-input
                borderless
                type="number"
                dense
                filled
                v-model="store.PersonaById.documento_per"
                label="Cedula"
                bg-color="accent"
              />
            </div>
            <div
              class="
                col-12 col-md-6
              "
            >
              <q-input
                dense
                filled
                type="tel"
                v-model="store.PersonaById.tlf_per"
                standout
                bg-color="accent"
                label="Teléfono"
                hint="Teléfono de contacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Conctato no valido'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="phone_android" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div
              class="
                col-12 col-md-6
              "
            >
              <p class="col text-subtitle2">Correo</p>
              <q-input
                dense
                filled
                v-model="store.PersonaById.correo_per"
                type="email"
                standout
                bg-color="accent"
                label="Corrreo"
                hint="Correo de contacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Conctato no valido'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="contact_mail" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <p class="col text-subtitle2">Fecha de Nacimiento</p>
              <q-input
                dense
                color="black"
                bg-color="accent"
                v-model="store.PersonaById.fecha_nac_per"
                hint="Fecha nacimiento"
                type="date"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Nacimiento no valido'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <p class="col text-subtitle2">Dirección de habitación</p>
              <q-input
                v-model="store.PersonaById.direccion_per"
                filled
                clearable
                type="textarea"
                color="red-12"
                label="Dirección de habitacion"
                input-style="height:2px"
                bg-color="accent"
              />
            </div>
            <div class="col-12 col-md-6">
              <p class="col text-subtitle2">Genero</p>
              <div class="q-gutter-sm">
                <q-radio
                  dense
                  v-model="store.PersonaById.genero_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="M"
                  label="Masculino"
                />
                <q-radio
                  dense
                  v-model="store.PersonaById.genero_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="F"
                  label="Femenino"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          no-caps
          label="Guardar"
          type="submit"
          color="primary"
          @click="UpdatePersona(),closemodal()"
        />
        <q-btn
          no-caps
          label="Cancelar"
          color="primary"
          flat
          @click="closemodal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, inject } from 'vue'
//const datos = inject('data')
const props = defineProps({
  persistent: Boolean
})

import { usePersonaByIdStore } from '../../stores/PersonaByIdStore'
const store = usePersonaByIdStore()

const options = ref(['V', 'E'])
const persistente = ref(props.persistent)
const emit = defineEmits(['closeModel'])

const UpdatePersona = async () => {
  const params = ref({
    nacionalidad_per: store.PersonaById.nacionalidad_per,
    tipo_per: store.PersonaById.tipo_per,
    documento_per: store.PersonaById.documento_per,
    nombres_per: store.PersonaById.nombres_per,
    apellidos_per: store.PersonaById.apellidos_per,
    correo_per: store.PersonaById.correo_per,
    tlf_per: store.PersonaById.tlf_per,
    direccion_per: store.PersonaById.direccion_per,
    fecha_nac_per: store.PersonaById.fecha_nac_per,
    genero_per: store.PersonaById.genero_per
  })
  const id = ref(store.PersonaById.id)
  await store.updatePersona(params.value, id.value)
}

const closemodal = () => {
  emit('closeModel', false)
};
</script>
