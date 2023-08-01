<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar proveedor
            </div>
          </q-card-section>
        </div>

        <div class="col-12 text-left">
          <p class="text-subtitle2">Estado proveedor</p>
        </div>
      </div>

      <q-form @submit.prevent="AddProveedor()" @reset="onReset">
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="persona"
              :options="apipersona"
              label="Persona"
              :option-label="
                apipersona =>
                  apipersona === null
                    ? null
                    : apipersona.nombres_per + apipersona.apellidos_per
              "
              :option-value="
                apipersona => (apipersona === null ? null : apipersona.id)
              "
              emit-value
              map-options
              standout
              bg-color="accent"
              hint="Seleccione Persona"
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
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
          >
            <q-select
              dense
              standout
              bg-color="accent"
              :options="apiempresa"
              :option-label="
                apiempresa =>
                  apiempresa === null ? null : apiempresa.nombre_empre
              "
              :option-value="
                apiempresa => (apiempresa === null ? null : apiempresa.id)
              "
              emit-value
              map-options
              filled
              v-model="empresa"
              label="Empresa"
              hint="Seleccione empresa"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-select>
          </div>
        </div>

        <div class="col-12 q-pr-md q-pt-md">
          <q-input
            dense
            color="black"
            bg-color="accent"
            v-model="detalle"
            label="Detalle"
            hint="Escriba algún detalle"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Detalle no valido']"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
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
import { computed, ref, onUpdated } from 'vue'
import { usePersonaByIdStore } from '../../stores/PersonaByIdStore'
import { useEmpresaStore } from '../../stores/EmpresaStore'
import { useProveedorStore } from '../../stores/ProveedorStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const storePersona = usePersonaByIdStore()
const storeEmpresa = useEmpresaStore()
const storeProveedor = useProveedorStore()

const apiempresa = computed(() => storeEmpresa.Empresa)
const apipersona = computed(() => storePersona.Persona)
const shape = ref('ACTIVO')
const persona = ref('')
const empresa = ref('')
const detalle = ref('')

const AddProveedor = async () => {
  const params = ref({
    personaId: persona,
    empresaId: empresa,
    status_prov: shape,
    detalle_prov: detalle
  })
  await storeProveedor.ProveedorAdd(params.value)
  instance.proxy.$forceUpdate()

}

onUpdated(async () => {
await storeProveedor.ProveedorAll()
})

const onReset = () => {
  persona.value = null
  empresa.value = null
  detalle.value = null
};
</script>
