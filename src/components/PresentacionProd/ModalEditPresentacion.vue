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
        <div class="text-h6">Editar presentación</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updatePresentacion(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
              <q-input
                dense
                filled
                v-model="store.PresentacionId.nombre_present"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba presentación'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div
              class="
              col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5
            "
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="store.PresentacionId.abreviatura_present"
                label="Abreviatura"
                hint=" Abreviatura Identificatoria"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Abreviatura'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
            >
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="store.PresentacionId.unidadMedidadId"
                :options="apilista"
                :option-label="
                  apilista =>
                    apilista === null ? null : apilista.nombre_unidad
                "
                :option-value="
                  apilista => (apilista === null ? null : apilista.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Unidad de medidad"
                hint="Seleccione unidad"
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
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="store.PresentacionId.descripcion_present"
                label="Descripción"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Descripción'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
            "
            >
              <q-toggle
                left-label
                icon="task_alt"
                true-value="ACTIVO"
                false-value="INACTIVO"
                v-model="store.PresentacionId.status_present"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione Estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(store.PresentacionId.status_present)
                  }}</q-chip></strong
                >
              </div>
            </div>
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
import { computed, ref } from 'vue'
import { usePresentacionStore } from '../../stores/PresentacionStore'
import { useUnidadMedidaStore } from '../../stores/UnidadMedidaStore'

const store = usePresentacionStore()
const storeUnidad = useUnidadMedidaStore()
const apilista = computed(() => storeUnidad.Umedida)
const persistente = ref('')
const props = defineProps({ persistent: Boolean })
const emit = defineEmits(['closeModel'])

const updatePresentacion = async () => {
  const params = ref({
    nombre_present: store.PresentacionId.nombre_present,
    descripcion_present: store.PresentacionId.descripcion_present,
    unidadMedidadId: store.PresentacionId.unidadMedidadId,
    abreviatura_present: store.PresentacionId.abreviatura_present,
    status_present: store.PresentacionId.status_present
  })
  const id = ref(store.PresentacionId.id)
  await store.PresentacionUpdate(params.value, id.value)
}
const closeModal = () => {
  emit('closeModel', false)
}
</script>
