<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="rol"
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
                @click="openModal(), editRol(props.row.id)"
              />
              <q-btn
                disable
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
    <ModalEdit :persistent="persistent" @closeModel="persistent = false">
    </ModalEdit>
  </div>
</template>

<script setup>
import ModalEdit from '../Roles/ModalRol.vue'
import { useRolStore } from '../../stores/RolStore'
import { computed, onUpdated, ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const store = useRolStore()
const rol = computed(() => store.Rol)

const columns = [
  {
    name: 'nombre_rol',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_rol,
    format: val => `${val}`
  },
  {
    name: 'detalle_rol',
    align: 'center',
    label: 'Detalle',
    field: 'detalle_rol'
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

const deleteCategoria = async id => {
  await store.CategoriaDelete(id)
  instance.proxy.$forceUpdate()
}

const editRol = async id => {
  await store.RolById(id)
}

onUpdated(async () => {
  await store.RolAll()
})

const openModal = () => {
  persistent.value = true
};
</script>
