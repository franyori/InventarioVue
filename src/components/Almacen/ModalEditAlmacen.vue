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
        <q-form id="form" @submit.prevent="updateAlmacen(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-input
                dense
                filled
                v-model="store.AlmacenId.nombre_bodega"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba Almacen']"
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
                v-model="store.AlmacenId.descripcion_bodega"
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
                standout
                bg-color="accent"
                filled
                v-model="store.AlmacenId.ubicacion_bodega"
                label="Ubicación"
                hint="Dirección"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba dirección']"
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
                v-model="store.AlmacenId.status_bodega"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione un estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(store.AlmacenId.status_bodega)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn label="Guardar" type="submit" color="primary" no-caps />
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
import { onUpdated, ref } from 'vue'
import { useAlmacenStore } from '../../stores/AlmcenStore'

const store = useAlmacenStore()

const props = defineProps({
  persistent: Boolean
})
const emit = defineEmits(['closeModel'])

const updateAlmacen = async () => {
  const params = ref({
    nombre_bodega: store.AlmacenId.nombre_bodega,
    descripcion_bodega: store.AlmacenId.descripcion_bodega,
    ubicacion_bodega: store.AlmacenId.ubicacion_bodega,
    status_bodega: store.AlmacenId.status_bodega
  })
  const id = ref(store.AlmacenId.id)

  await store.AlmacenUpdate(params.value, id.value)
}

const persistente = ref('')
const closeModal = () => {
  emit('closeModel', false)
}
</script>
