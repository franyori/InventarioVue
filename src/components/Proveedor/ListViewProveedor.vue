<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pa-md">
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="storeProveedor.Proveedor"
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
                @click="openModal(), editProveedor(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="ProveedorDelete(props.row.id)"
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
import { onUpdated, ref } from 'vue'
import { useProveedorStore } from '../../stores/ProveedorStore'
import { getCurrentInstance } from 'vue'
import ModalEdit from '../../components/Proveedor/ModalProveedor.vue'

const instance = getCurrentInstance()
const storeProveedor = useProveedorStore()

const columns = [
  {
    name: 'Empresa.rif_empre',
    required: true,
    label: 'Rif empresa',
    align: 'center',
    field: row => row.Empresa.rif_empre,
    format: val => `${val}`
  },

  {
    name: 'Persona.nombres_per',
    label: 'Nombres',
    align: 'center',
    field: row => row.Persona.nombres_per
  },
  {
    name: 'Persona.apellidos_per',
    label: 'Apellidos',
    align: 'center',
    field: row => row.Persona.apellidos_per
  },
  {
    name: 'Persona.tlf_per',
    label: 'Teléfono',
    align: 'center',
    field: row => row.Persona.tlf_per
  },
  {
    name: 'status_prov',
    label: 'Estado',
    align: 'center',
    field: 'status_prov'
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

const ProveedorDelete = async id => {
  await storeProveedor.ProveedorDelete(id)
  instance.proxy.$forceUpdate()
}

const editProveedor = async id => {
  await storeProveedor.ProveedorById(id)
}

onUpdated(async () => {
  await storeProveedor.ProveedorAll()
})

const openModal = () => {
  persistent.value = true
}
</script>
