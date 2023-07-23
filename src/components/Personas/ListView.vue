<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pa-md">
    {{ persistent }}
    {{ closeModel }}
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="props.apiList"
          :columns="columns"
          row-key="id"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
          flat
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
                @click="openModal()"
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
import ModalEdit from './ModalEditView.vue'
import { ref, defineProps } from 'vue'
import PersonaService from '../../services/PersonaService'

const rows = ref([])
const persistent = ref(true)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})
const filter = ref('')
const editApi = ref({})
const props = defineProps(['apiList'])

const DeletePersona = async id => {
  const deletePersonaService = new PersonaService()
  const deletePersona = await deletePersonaService.deletePersona(id)
}

const openModal = () => {
      persistent.value = true
    }

const columns = [
  {
    name: 'nacionalidad_per',
    required: true,
    label: 'Nacionalidad',
    align: 'center',
    field: row => row.nacionalidad_per,
    format: val => `${val}`
  },
  {
    name: 'documento_per',
    align: 'center',
    label: 'Cedula',
    field: 'documento_per'
  },
  {
    name: 'nombres_per',
    label: 'Nombres',
    align: 'center',
    field: 'nombres_per'
  },
  {
    name: 'apellidos_per',
    label: 'Apellidos',
    align: 'center',
    field: 'apellidos_per'
  },
  {
    name: 'tlf_per',
    label: 'Teléfono',
    align: 'center',
    field: 'tlf_per'
  },
  {
    name: 'direccion_per',
    label: 'Dirección',
    align: 'center',
    field: 'direccion_per'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]
</script>
