<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pt-none">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="store.Empresa"
          column-sort-order="ad"
          :columns="columns"
          :row-key="row => row.id"
          separator="none"
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
                @click="openModal(), editEmpresa(props.row.id)"
              />

              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteEmpresa(props.row.id)"
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
import ModalEdit from './ModalEditEmpresa.vue'
import {useEmpresaStore} from '../../stores/EmpresaStore'
import { onUpdated, ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useEmpresaStore()

const columns = [
  {
    name: 'nombre_empre',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_empre,
    format: val => `${val}`
  },
  {
    name: 'rif_empre',
    align: 'center',
    label: 'Rif',
    field: 'rif_empre'
  },
  {
    name: 'representante_empre',
    align: 'center',
    label: 'Representante',
    field: 'representante_empre'
  },
  {
    name: 'tlf_local_empre',
    align: 'center',
    label: 'Telefono de Conctacto',
    field: 'tlf_local_empre'
  },
  {
    name: 'tipo_empre',
    align: 'center',
    label: 'Tipo',
    field: 'tipo_empre'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const filter = ref('')
const persistent = ref(false)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const editEmpresa = (async(id)=>{
await store.EmpresaById(id)
})

const deleteEmpresa = (async(id)=>{
await store.EmpresaDelete(id)
instance.proxy.$forceUpdate()
})

onUpdated(async()=>{
await store.EmpresaAll()
})

const openModal = () => {
  persistent.value = true
}
</script>
