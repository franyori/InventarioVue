<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="categoria"
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
              standouts
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
                @click="openModal(),editCategoria(props.row.id)"
              />

              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteCategoria(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      @closeModel="persistent = false"
    >
    </ModalEdit>
  </div>
</template>

<script setup>
import ModalEdit from '../Categorias/ModalCategoria.vue'
import { useCategoriaStore } from '../../stores/CategoriaStore'
import { computed, onUpdated, ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useCategoriaStore()
const categoria = computed(() => store.Categoria)

const columns = [
  {
    name: 'nombre_categoria',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_categoria,
    format: val => `${val}`
  },
  {
    name: 'detalle_categoria',
    align: 'center',
    label: 'Detalle',
    field: 'detalle_categoria'
  },
  {
    name: 'status_categoria',
    align: 'center',
    label: 'Estado',
    field: 'status_categoria'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const persistent = ref(false)
const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
}

const filter = ref('')

const deleteCategoria = (async(id)=>{
await store.CategoriaDelete(id)
instance.proxy.$forceUpdate()
})

const editCategoria = (async(id)=>{
await store.CategoriaById(id)
})

onUpdated(async() =>{
await store.CategoriaAll()
})

const openModal = () => {
  persistent.value = true
}
</script>
