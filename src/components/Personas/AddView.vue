<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar persona
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Tipo de persona</p>
        </div>
      </div>
      <q-form @submit.prevent="AddPersona" @reset="onReset">
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

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
            <q-input
              dense
              filled
              v-model="name"
              standout
              bg-color="accent"
              label="Nombres"
              hint="Primero y Segundo"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba sus Nombres']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="apellido"
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
              col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
              text-no-wrap
              q-pt-md q-pr-md
            "
        >
          <p class="col text-weight-medium">Documento</p>
        </div>
        <div class="row">
          <div
            class="
              col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4
              text-no-wrap
              q-pt-xs
            "
          >
            <q-select
              borderless
              dense
              filled
              v-model="nacionalidad"
              :options="options"
              label="Tipo"
              bg-color="accent"
              :rules="[
                val => (val && val.length > 0) || 'Nacionalidad Invalidad'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="wallet" />
              </template>
            </q-select>
          </div>
          <div
            class="
              col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8
              text-no-wrap
              q-pt-xs q-pr-md
            "
          >
            <q-input
              borderless
              type="number"
              dense
              filled
              v-model="cedula"
              label="Cedula"
              bg-color="accent"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Cedula Invalidad']"
            />
          </div>
        </div>

        <div class="row">
          <div
            class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
                q-pr-md q-pt-md
              "
          >
            <p class="col text-subtitle2">Teléfono</p>
            <q-input
              dense
              filled
              type="tel"
              v-model="telefono"
              standout
              bg-color="accent"
              label="Teléfono"
              hint="Teléfono de Contacto"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Conctato No valido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="phone_android" />
              </template>
            </q-input>
          </div>

          <div
            class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
                q-pr-md q-pt-md
              "
          >
            <p class="col text-subtitle2">Correo</p>
            <q-input
              dense
              filled
              v-model="correo"
              type="email"
              standout
              bg-color="accent"
              label="Correo"
              hint="Correo de Contacto"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Conctato No valido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="contact_mail" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Fecha de nacimiento</p>
          <q-input
            dense
            standout
            bg-color="accent"
            v-model="nacimiento"
            hint="Fecha nacimiento"
            type="date"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Nacimiento no valido']"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Genero</p>
          <div class="q-gutter-sm">
            <q-radio
              dense
              v-model="genero"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="M"
              label="Masculino"
            />
            <q-radio
              dense
              v-model="genero"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="F"
              label="Femenino"
            />
          </div>
        </div>
        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Dirección de habitación</p>
          <q-input
            v-model="direccion"
            filled
            clearable
            type="textarea"
            color="red-12"
            label="Dirección"
            input-style="height:2px"
            bg-color="accent"
          />
        </div>
        <div class="col-12 q-pt-md">
          <q-btn no-caps label="Guardar" type="submit" color="primary" />
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
import { Notify } from 'quasar'
import { ref , onUpdated} from 'vue'
import { useQuasar } from 'quasar'
import PersonaService from '../../services/PersonaService'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance();
const $q = useQuasar()
const genero = ref('M')
const shape = ref('N')
const name = ref('')
const cedula = ref('')
const apellido = ref('')
const correo = ref('')
const telefono = ref('')
const nacimiento = ref('')
const direccion = ref('')
const nacionalidad = ref('')
const accept = ref(false)
const model = ref(null)
const options = ref(['V', 'E'])

const onReset = () => {
  name.value = null
  cedula.value = null
  correo.value = null
  telefono.value = null
  apellido.value = null
  direccion.value = null
  nacionalidad.value = null
  shape.value = 'N'
  genero.value = 'M'
}

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning'
    })
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
const params = {
  nombres_per: name,
  documento_per: cedula,
  correo_per: correo,
  tlf_per: telefono,
  apellidos_per: apellido,
  nacionalidad_per: nacionalidad,
  fecha_nac_per: nacimiento,
  direccion_per: direccion,
  tipo_per: shape.value,
  genero_per: genero.value
}


const addPersonaService = new PersonaService()

  const AddPersona = async () => {
  const propss  = ref(params)
  await addPersonaService.addPer(propss.value)
  instance.proxy.$forceUpdate()
  
};
 
onUpdated(async () => {
  await addPersonaService.PersonaAll()

console.log("up")
});
</script>
