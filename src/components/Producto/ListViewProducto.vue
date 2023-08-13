<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="store.Producto"
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
                @click="openModal(), editProducto(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="props.row.id;"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit :persistent="persistent" @closeModel="false"> </ModalEdit>
  </div>
</template>

<script setup>
//import ModalEdit from './ModalEdit.vue'
import { useProductoStore } from '../../stores/ProductoStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useProductoStore()

const columns = [
  {
    name: 'nombre_prod',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_prod,
    format: val => `${val}`
  },

  {
    name: 'precio_prod',
    label: 'Precio',
    align: 'center',
    field: row => row.precio_prod
  },
  {
    name: 'codigo_prod',
    label: 'Código',
    align: 'center',
    field: row => row.codigo_prod
  },
  {
    name: 'Categoria.nombre_categoria',
    label: 'Categoria',
    align: 'center',
    field: row => row.Categoria.nombre_categoria
  },
  {
    name: 'PresentacionProd.nombre_present',
    label: 'Presentación',
    align: 'center',
    field: row => row.PresentacionProd.nombre_present
  },
  {
    name: 'Bodega.nombre_bodega',
    label: 'Bodega',
    align: 'center',
    field: row => row.Bodega.nombre_bodega
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

const openModal = () => {
  persistent.value = true
}
const editProducto = async id => {
  await store
    .ProductoById(id)
    .then(() => router.push('/IndexPage/ProductoEdit/' + `${id}`))
}


</script>
