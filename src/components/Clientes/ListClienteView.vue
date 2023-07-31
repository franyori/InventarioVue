<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pa-md">
    <q-card flat>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="store.Cliente"
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
                @click="openModal(),EditCliente(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="DeletePersona(props.row.id)"
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
import { ref, onUpdated} from 'vue'
import ModalEdit from './ModalViewCliente.vue'
import {useClienteStore} from '../../stores/ClienteStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance();
const store = useClienteStore()

const columns = ref([
  {
    name: 'Persona.nombres_per',
    required: true,
    label: 'Cliente',
    align: 'center',
    field: row => row.Persona.nombres_per,
    format: val => `${val}`
  },
  {
    name: 'Persona.documento_per',
    align: 'center',
    label: 'Cedula',
    field: row => row.Persona.documento_per
  },
  {
    name: 'detalle_client',
    label: 'Detalle',
    align: 'center',
    field: 'detalle_client'
  },
  {
    name: 'status_client',
    label: 'Estado',
    align: 'center',
    field: 'status_client'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
])

const persistent = ref(false)
const filter = ''
const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
}

const DeletePersona = async id => {
  await store.ClienteDelete(id)
  instance.proxy.$forceUpdate()
}

const EditCliente = (async(id)=>{
await store.ClienteById(id)
})

onUpdated(async () => {
await store.ClienteAll()
})

const openModal = () => {
  persistent.value = true
};
</script>
