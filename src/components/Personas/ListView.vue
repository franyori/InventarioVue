<template>
  <div class="col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 q-pa-md">
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="store.Persona"
          :columns="columns"
          ref="tableRef"
          row-key="id"
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
          flat
        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-md q-mt-sm"
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
                @click="openModal(), EditarPersona(props.row.id)"
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
    <ModalEdit :persistent="persistent" @closeModel="persistent = false">
    </ModalEdit>
  </div>
</template>

<script setup>
import ModalEdit from "./ModalEditView.vue";
import { ref, onUpdated } from "vue";
//provide('data',props)
import { usePersonaByIdStore } from "../../stores/PersonaByIdStore";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const store = usePersonaByIdStore();
const tableRef = ref();
const persistent = ref(false);
const initialPagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const filter = ref("");

onUpdated(async () => {
  await store.PersonaAll();
  tableRef.value.requestServerInteraction();
});

const DeletePersona = async (id) => {
  await store.deletePersona(id);
  instance.proxy.$forceUpdate();
};

const EditarPersona = async (id) => {
  await store.editPersona(id);
};

const openModal = () => {
  persistent.value = true;
};

const columns = [
  {
    name: "documento_per",
    required: true,
    label: "Cedula",
    align: "left",
    field: (row) => row.nacionalidad_per + " - " + row.documento_per,
    format: (val) => `${val}`,
  },
  {
    name: "nombres_per",
    label: "Nombres",
    align: "left",
    field: "nombres_per",
  },
  {
    name: "apellidos_per",
    label: "Apellidos",
    align: "left",
    field: "apellidos_per",
  },
  {
    name: "tlf_per",
    label: "Teléfono",
    align: "left",
    field: "tlf_per",
  },
  {
    name: "direccion_per",
    label: "Dirección",
    align: "left",
    field: "direccion_per",
  },
  {
    name: "actions",
    align: "center",
    label: "Acciones",
  },
];
</script>
