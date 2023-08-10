<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="store.Umedida"
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
                @click="openModal(), editUnidad(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteunidad(props.row.id)"
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
import ModalEdit from './ModalEditUnidad.vue'
import { useUnidadMedidaStore } from '../../stores/UnidadMedidaStore'
import { onUpdated, ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useUnidadMedidaStore()

const columns = [
  {
    name: 'nombre_unidad',
    required: true,
    label: 'Unidad de medida',
    align: 'center',
    field: row => row.nombre_unidad,
    format: val => `${val}`
  },
  {
    name: 'descripcion_unidad',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion_unidad'
  },
  {
    name: 'cantidad_unidad',
    label: 'Cantidad',
    align: 'center',
    field: 'cantidad_unidad'
  },
  {
    name: 'status_unidad',
    label: 'Estado',
    align: 'center',
    field: 'status_unidad'
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

const editUnidad = (async(id)=>{
await store.UmedidaById(id)
})

const deleteunidad =(async(id)=>{
await store.UmedidaDelete(id)
instance.proxy.$forceUpdate()
})

onUpdated(async()=>{
await store.UmedidaAll()
})

const openModal = () => {
  persistent.value = true
}
</script>
