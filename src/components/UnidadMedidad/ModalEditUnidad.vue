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
        <div class="text-h6">Editar bodega</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updateUnidad(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-input
                dense
                filled
                v-model="store.UmedidaId.nombre_unidad"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba unidad']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
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
                v-model="store.UmedidaId.descripcion_unidad"
                label="Descripción"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba descripción'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
            >
              <q-input
                dense
                min="0"
                standout
                bg-color="accent"
                filled
                v-model="store.UmedidaId.cantidad_unidad"
                label="Cantidad"
                hint="Cantidad contenidad en la unidad"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Escriba cantidad'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
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
                v-model="store.UmedidaId.status_unidad"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(store.UmedidaId.status_unidad)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions>
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
import { ref } from 'vue'
import { useUnidadMedidaStore } from '../../stores/UnidadMedidaStore'

const store = useUnidadMedidaStore()

const persistente = ref('')
const props = defineProps({
  persistent: Boolean
})

const emit = defineEmits(['closeModel'])

const updateUnidad = async () => {
  const params = ref({
    nombre_unidad: store.UmedidaId.nombre_unidad,
    descripcion_unidad: store.UmedidaId.descripcion_unidad,
    cantidad_unidad: store.UmedidaId.cantidad_unidad,
    status_unidad: store.UmedidaId.status_unidad
  })
  const id = ref(store.UmedidaId.id)
  await store.UmedidaUpdate(params.value, id.value)
}
const closeModal = () => {
  emit('closeModel', false)
}
</script>
