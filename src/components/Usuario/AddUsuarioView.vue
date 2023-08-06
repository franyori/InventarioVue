<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar usuario
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addUsuario()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              filled
              v-model="personaId"
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
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              filled
              v-model="rolId"
              :options="apiRol"
              :option-label="
                apiRol => (apiRol === null ? null : apiRol.nombre_rol)
              "
              :option-value="apiRol => (apiRol === null ? null : apiRol.id)"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Roles"
              hint="Seleccione Rol"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
          <q-input 
            dense
            color="black"
            bg-color="accent"
            v-model="usuario"
            label="Usuario"
            hint="Escriba un usuario"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Usuario no valido']"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
          <q-input 
            dense
            color="black"
            bg-color="accent"
            v-model="password"
            label="Password"
            hint="Escriba un password"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Password Invalidad',
                       val => val.length >= 6  || 'Minimo 6 Digitos',
                       val => val.length <= 10  || 'No Mayor de 10 Digitos'

            ]"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
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
              v-model="status_usuario"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione un estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_usuario)
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
import { ref,onUpdated, computed} from 'vue'
import {useUsuarioStore} from '../../stores/UsuarioStore'
import { getCurrentInstance } from 'vue'
import {usePersonaByIdStore} from '../../stores/PersonaByIdStore'
import {useRolStore} from '../../stores/RolStore'


const instance = getCurrentInstance()
const storeUsuario = useUsuarioStore()
const storePersona = usePersonaByIdStore()
const storeRol = useRolStore()

const apiList = computed(()=>storePersona.Persona)
const apiRol = computed(()=>storeRol.Rol)

const shape = ref('line')
const personaId = ref('')
const rolId = ref('')
const model = ref('')
const usuario = ref('')
const password = ref('')
const detalle_usuario = ref('')
const status_usuario = ref('')



const addUsuario = (async()=>{
  const params = ref({
    personaId: personaId,
    rolId: rolId,
    usuario: usuario,
    password: password,
    detalle_usuario: detalle_usuario,
    status_usuario:status_usuario 
      })
await storeUsuario.UsuarioAdd(params.value)
instance.proxy.$forceUpdate()
onReset()
})

onUpdated(async () => {
await storeUsuario.UsuarioAll()
})

const onReset = () => {
  personaId.value = null
  rolId.value = null
  usuario.value = null
  password.value = null
  detalle_usuario.value = null
  status_usuario.value = ''
};
</script>
