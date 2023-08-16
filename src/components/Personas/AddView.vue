<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="q-pa-md box-shadow">
      <div class="row">
        <div class="col-12">
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
      <q-form @submit.prevent.stop="AddPersona" @reset="onReset">
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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
            <q-input
              dense
              v-model="name"
              standout
              bg-color="accent"
              label="Nombres"
              hint="Nombres"
              label-color="black"
              input-class="text-black"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-xs">
            <q-input
              label-color="black"
              input-class="text-black"
              dense
              standout
              bg-color="accent"
              v-model="apellido"
              label="Apellidos"
              hint="Apellidos"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-mt-md">
            <p class="col text-weight-medium">Documento</p>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-xs text-no-wrap q-pt-xs"
          >
            <q-select
              dense
              standout
              v-model="nacionalidad"
              :options="options"
              label="Tipo"
              bg-color="accent"
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="wallet" />
              </template>
            </q-select>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-no-wrap q-pt-xs q-pa-xs"
          >
            <q-input
              label-color="black"
              input-class="text-black"
              standout
              mask="##########"
              maxlength="10"
              dense
              v-model="cedula"
              label="Cedula"
              bg-color="accent"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Campo requerido',
                (val) => val.length >= 6 || 'Minimo 6 digitos',
                (val) => val.length <= 10 || 'No Mayor de 10 digitos',
              ]"
            />
          </div>
        </div>

        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-md"
          >
            <p class="col text-subtitle2">Teléfono</p>
            <q-input
              label-color="black"
              input-class="text-black"
              dense
              mask="####-#######"
              v-model="telefono"
              standout
              bg-color="accent"
              label="Teléfono"
              hint="Teléfono de Contacto"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Conctato No valido',
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="phone_android" />
              </template>
            </q-input>
          </div>

          <div
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-md"
          >
            <p class="col text-subtitle2">Correo</p>
            <q-input
              label-color="black"
              input-class="text-black"
              dense
              v-model="correo"
              type="email"
              standout
              bg-color="accent"
              label="Correo"
              hint="Correo de contacto"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
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
            label-color="black"
            input-class="text-black"
            dense
            standout
            bg-color="accent"
            v-model="nacimiento"
            hint="Fecha nacimiento"
            type="date"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Género</p>
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
            clearable
            standout
            dense
            type="textarea"
            color="red-12"
            label="Dirección"
            input-style="height:34px"
            bg-color="accent"
          />
        </div>
        <div class="col-12 q-pt-md text-right">
          <q-btn
            padding="2px 22px 2px 22px"
            no-caps
            style="border-radius: 8px"
            label="Guardar"
            type="submit"
            color="primary"
          />
          <q-btn
            outline
            padding="2px 22px 2px 22px"
            style="border-radius: 8px"
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { Notify } from "quasar";
import { ref, onUpdated } from "vue";
import { useQuasar } from "quasar";
import PersonaService from "../../services/PersonaService";
import { getCurrentInstance } from "vue";
import { usePersonaByIdStore } from "../../stores/PersonaByIdStore";

const store = usePersonaByIdStore();
const instance = getCurrentInstance();
const $q = useQuasar();
const genero = ref("M");
const shape = ref("N");
const name = ref("");
const cedula = ref("");
const apellido = ref("");
const correo = ref("");
const telefono = ref("");
const nacimiento = ref("");
const direccion = ref("");
const nacionalidad = ref("");
const options = ref(["V", "E"]);

const onReset = () => {
  name.value = null;
  cedula.value = "";
  correo.value = "";
  telefono.value = "";
  apellido.value = "";
  direccion.value = "";
  nacionalidad.value = "";
  shape.value = "N";
  genero.value = "M";
};

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
  genero_per: genero.value,
};

const addPersonaService = new PersonaService();

const AddPersona = async () => {
  const propss = ref(params);
  await addPersonaService.addPer(propss.value);
  instance.proxy.$forceUpdate();
  onReset();
};

onUpdated(async () => {
  await store.PersonaAll();
});
</script>
