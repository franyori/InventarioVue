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
        <div class="text-h6">Editar rol</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit.prevent="updateRol(), closeModal()"
        >
          <div class="row q-col-gutter-md">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <q-input
                disable
                dense
                filled
                v-model="store.RolId.nombre_rol"
                standout
                bg-color="accent"
                label="Rol"
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
                v-model="store.RolId.detalle_rol"
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
import {useRolStore} from '../../stores/RolStore'

const store = useRolStore()
const persistente = ref('')

const props = defineProps({
    persistent: Boolean,
  })
const emit = defineEmits(['closeModel'])

const updateRol = (async()=>{
  const params = ref({
    nombre_rol: store.RolId.nombre_rol,
    detalle_rol:store.RolId.detalle_rol,
      })
  const id = ref(store.RolId.id)
await store.RolUpdate(params.value,id.value)
})
  
const closeModal = () =>{
      emit('closeModel', false)
    }

</script>
