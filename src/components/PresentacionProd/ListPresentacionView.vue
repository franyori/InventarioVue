<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="store.Presentacion"
          :columns="columns"
          :row-key="row => row.id"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-lg q-mt-sm"
              standout
              round
              bg-color="accent"
              dense
              debounce="300"
              v-model="filter"
              placeholder="Búsqueda"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                icon="visibility"
                size="xs"
                class="q-ma-none"
                color="primary"
                @click="openModal(), editPresent(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deletePresent(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit :persistent="persistent" @closeModel="persistent = false">
    </ModalEdit>
  </div>
</template>

<script setup>
import ModalEdit from './ModalEditPresentacion.vue'
import { getCurrentInstance, onUpdated } from 'vue'
import { ref } from 'vue'
import {usePresentacionStore } from '../../stores/PresentacionStore'

const store = usePresentacionStore()
const instance = getCurrentInstance()


const columns = [
  {
    name: 'nombre_present',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_present,
    format: val => `${val}`
  },
  {
    name: 'descripcion_present',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion_present'
  },
  {
    name: 'UnidadMedidad.nombre_unidad',
    label: 'Unidad de medidad',
    align: 'center',
    field: row => row.UnidadMedidad.nombre_unidad
  },
  {
    name: 'abreviatura_present',
    label: 'Abrevitura',
    align: 'center',
    field: 'abreviatura_present'
  },
  {
    name: 'status_present',
    label: 'Estado',
    align: 'center',
    field: 'status_present'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const persistent = ref(false)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const filter = ref('')

const editPresent = (async(id)=>{
  await store.PresentacionById(id)
})

const deletePresent = (async(id)=>{
await store.PresentacionDelete(id)
instance.proxy.$forceUpdate()

})
const openModal = () => {
  persistent.value = true
}

onUpdated(async()=>{
  await store.PresentacionAll()
})
</script>
