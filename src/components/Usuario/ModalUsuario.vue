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
        <div class="text-h6">Editar categoria</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit.prevent="updateCategoria(), closeModal()"
        >
          <div class="row q-col-gutter-md">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <q-input
                dense
                filled
                v-model="store.CategoriaId.nombre_categoria"
                standout
                bg-color="accent"
                label="Categoria"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba categoria']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="store.CategoriaId.detalle_categoria"
                label="Detalle"
                hint="Descripción"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
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
                v-model="store.CategoriaId.status_categoria"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(store.CategoriaId.status_categoria)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions align="right">
              <q-btn no-caps label="Guardar" type="submit" color="primary" />
              <q-btn
                no-caps
                label="Cancelar"
                color="primary"
                flat
                class="q-ml-sm"
                @click="closeModal()"
              />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {ref} from 'vue'
import {useCategoriaStore} from '../../stores/CategoriaStore'

const store = useCategoriaStore()
const persistente = ref('')

const props = defineProps({
    persistent: Boolean,
  })
const emit = defineEmits(['closeModel'])

const updateCategoria = (async()=>{
  const params = ref({
        nombre_categoria: store.CategoriaId.nombre_categoria,
        detalle_categoria:store.CategoriaId.detalle_categoria,
        status_categoria: store.CategoriaId.status_categoria
      })
  const id = ref(store.CategoriaId.id)
await store.CategoriaUpdate(params.value,id.value)
})
  
const closeModal = () =>{
      emit('closeModel', false)
    }

</script>
