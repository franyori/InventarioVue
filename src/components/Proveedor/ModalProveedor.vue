<template>
  <q-dialog
    v-model="persistente"
    :model-value="persistent"
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
        <div class="text-h6">Editar proveedor</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="updateProveedor(),closeModal()">
          <div class="row q-col-gutter-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="storeProveedor.ProvedorId.status_prov"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="storeProveedor.ProvedorId.status_prov"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col col-12">
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="storeProveedor.ProvedorId.personaId"
                :options="apipersona"
                :option-label="
                  apipersona =>
                    apipersona === null
                      ? null
                      : apipersona.nombres_per + ' ' + apipersona.apellidos_per
                "
                :option-value="
                  apipersona => (apipersona === null ? null : apipersona.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Persona "
                hint="Seleccione persona"
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
            <div class="col col-12">
              <q-select
                dense
                standout
                bg-color="accent"
                v-model="storeProveedor.ProvedorId.empresaId"
                :options="apiempresa"
                :option-label="
                  apiempresa =>
                    apiempresa === null
                      ? null
                      : apiempresa.nombre_empre +
                        '  Rif:' +
                        apiempresa.rif_empre
                "
                :option-value="
                  apiempresa => (apiempresa === null ? null : apiempresa.id)
                "
                emit-value
                map-options
                filled
                label="Empresa"
                hint="Seleccione una empresa"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-select>
            </div>
          </div>

          <div class="col col-12 q-pt-md">
            <q-input
              dense
              color="black"
              bg-color="accent"
              v-model="storeProveedor.ProvedorId.detalle_prov"
              label="Detalles"
              hint="Escriba algún detalle"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Detalle no valido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <q-card-actions align="right">
        <q-btn label="Guardar" no-caps type="submit" color="primary" />
        <q-btn
          no-caps
          label="Cancelar"
          color="primary"
          flat
          @click="closeModal()"
        />
      </q-card-actions>
        </q-form>
      </q-card-section>
     
    </q-card>
  </q-dialog>
</template>

<script setup>
import { usePersonaByIdStore } from '../../stores/PersonaByIdStore'
import { useEmpresaStore } from '../../stores/EmpresaStore'
import { computed, ref } from 'vue'
import { useProveedorStore } from '../../stores/ProveedorStore'

const storePersona = usePersonaByIdStore()
const storeEmpresa = useEmpresaStore()
const storeProveedor = useProveedorStore()

const persistente = ref('')
const apipersona = computed(() => storePersona.Persona)
const apiempresa = computed(() => storeEmpresa.Empresa)
const props = defineProps({
  persistent: Boolean
})

const emit = defineEmits(['closeModel'])

const updateProveedor = async () => {
  const params = ref({
    personaId: storeProveedor.ProvedorId.personaId,
    empresaId: storeProveedor.ProvedorId.empresaId,
    status_prov: storeProveedor.ProvedorId.status_prov,
    detalle_prov: storeProveedor.ProvedorId.detalle_prov
  })
  const id = ref(storeProveedor.ProvedorId.id)
  await storeProveedor.ProveedorUpdate(params.value, id.value)
}

const closeModal = () => {
  emit('closeModel', false)
}
</script>
