<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="store.Almacen"
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
                @click="openModal(), editAlmacen(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteAlmacen(props.row.id)"
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
import ModalEdit from './ModalEditAlmacen.vue'
import { useAlmacenStore } from '../../stores/AlmcenStore'
import { ref,onUpdated } from 'vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()

const store = useAlmacenStore()

const columns = [
  {
    name: 'nombre_bodega',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_bodega,
    format: val => `${val}`
  },
  {
    name: 'descripcion_bodega',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion_bodega'
  },
  {
    name: 'ubicacion_bodega',
    label: 'Ubicación',
    align: 'center',
    field: 'ubicacion_bodega'
  },
  {
    name: 'status_bodega',
    label: 'Estado',
    align: 'center',
    field: 'status_bodega'
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

const editAlmacen = async id => {
  await store.AlmacenById(id)
}

const deleteAlmacen  = (async(id)=>{
await store.AlmacenDelete(id)
instance.proxy.$forceUpdate()

})

onUpdated(async()=>{
  await store.AlmacenAll()
})

const openModal = () => {
  persistent.value = true
}
</script>
