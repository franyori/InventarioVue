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
      style="width: 400px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar cliente</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent.stop="UpdateCliente(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="q-gutter-md">
              <q-radio
                dense
                v-model="store.ClienteId.tipo_client"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="N"
                label="Persona Natural"
              />
              <q-radio
                dense
                v-model="store.ClienteId.tipo_client"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="J"
                label="Persona Juridica"
              />
            </div>
          </div>
          <div class="col-12 text-left q-pt-md">
            <p class="text-subtitle2">Persona</p>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col col-12">
              <q-select
                dense
                filled
                v-model="store.ClienteId.personaId"
                :options="apipersona"
                :option-label="
                  apipersona =>
                    apipersona === null ? null : apipersona.nombres_per
                "
                :option-value="
                  apipersona => (apipersona === null ? null : apipersona.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Persona"
                hint="Seleccione persona"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-md">
            <div class="col col-12">
              <q-input
                dense
                filled
                v-model="store.ClienteId.detalle_client"
                standout
                bg-color="accent"
                label="Detalle"
                hint="Detalle cliente"
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
          <div class="row q-col-gutter-md ">
            <q-radio
              dense
              v-model="store.ClienteId.status_client"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="ACTIVO"
              label="ACTIVO"
            />
            <q-radio
              dense
              v-model="store.ClienteId.status_client"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="INACTIVO"
              label="INACTIVO"
            />
          </div>
          <q-card-actions align="right">
            <q-btn no-caps label="Guardar" type="submit" color="primary" />
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
import { computed, ref } from 'vue'
import { useClienteStore } from '../../stores/ClienteStore'
import { usePersonaByIdStore } from '../../stores/PersonaByIdStore'

const store = useClienteStore()
const storePersona = usePersonaByIdStore()

const apipersona = computed(() => storePersona.Persona)
const emit = defineEmits(['closeModel'])

const persistente = ref(props.persistent)

const props = defineProps({
  persistent: Boolean
})

const UpdateCliente = async () => {
  const params = ref({
    personaId: store.ClienteId.personaId,
    status_client: store.ClienteId.status_client,
    detalle_client: store.ClienteId.detalle_client,
    tipo_client: store.ClienteId.tipo_client
  })
  const id = ref(store.ClienteId.id)
  await store.ClienteUpdate(params.value, id.value)
}

const closeModal = () => {
  emit('closeModel', false)
}
</script>
