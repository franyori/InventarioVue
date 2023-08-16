<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header class="">
      <q-toolbar class="bg-purple-6 text-blue-grey-7">
        <q-btn
          flat
          dense
          round
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title class="text-white"> BambúStock </q-toolbar-title>
        <!--  <q-input
              rounded
              dense
              standout
              label="Busqueda..."
              bg-color="accent"
              v-model="text"
              class="q-ml-md text-black"
            >
              <template v-slot:append>
                <q-icon v-if="text === ''" name="search" />
                <q-icon
                  v-else
                  name="search"
                  class="cursor-pointer"
                  @click="text = ''"
                />
              </template>
            </q-input> -->
        <!-- <q-chip class="q-mr-sm q-ml-md">
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              John
            </q-chip> -->
        <q-btn
          flat
          round
          dense
          icon="build"
          color="white"
          class="q-mr-sm q-ml-sm"
          size="md"
        />
        <q-btn
          flat
          round
          dense
          color="white"
          icon="notifications"
          size="md"
          class="q-mr-sm"
        />
        <q-btn flat round dense icon="more_vert" size="md" color="white" />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="bg-purple-6"
      v-model="drawer"
      show-if-above
      :width="260"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list dense padding class="q-mt-md text-white">
        <q-item active clickable v-ripple>
          <q-expansion-item
            class="text-white rounded-borders"
            expand-separator
            icon="dashboard"
            label="Adminstración"
            to="/Login"
            no-caps
            expand-icon="none"
          >
          </q-expansion-item>
        </q-item>
        <q-item>
          <q-expansion-item
            class="rounded-borders"
            expand-separator
            icon="home_work"
            label="Adminstración"
            no-caps
          >
            <!--  <q-expansion-item
              :header-inset-level="1"
              expand-separator
              icon="receipt"
              label="Receipts"
            >
              <q-expansion-item
                switch-toggle-side
                dense-toggle
                label="Today"
                :header-inset-level="1"
                :content-inset-level="2"
              >
                <q-card>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                switch-toggle-side
                dense-toggle
                label="Yesterday"
                :header-inset-level="1"
                :content-inset-level="2"
              >
                <q-card>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-expansion-item>
            <q-expansion-item
              :header-inset-level="1"
              :content-inset-level="1"
              expand-separator
              icon="schedule"
              label="Postponed"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
          </q-expansion-item>
        </q-item>
        <q-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="person"
            label="Terceros"
            no-caps
          >
            <q-item-section side>
              <q-btn
                size="14px"
                :to="{ name: 'personas' }"
                flat
                icon="person_add"
                label="Persona"
                no-caps
                color="primary"
              ></q-btn>
            </q-item-section>
            <q-item-section side>
              <q-btn
                size="14px"
                :to="{ name: 'clientes' }"
                flat
                icon="person_add"
                label="Clientes"
                no-caps
                color="primary"
              ></q-btn>
            </q-item-section>
            <q-item-section side>
              <q-btn
                :to="{ name: 'proveedores' }"
                size="14px"
                flat
                icon="person_add"
                label="Proveedores"
                color="primary"
                no-caps
              ></q-btn>
            </q-item-section>
          </q-expansion-item>
        </q-item>
        <q-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="payments"
            label="Definición"
            no-caps
          >
            <q-expansion-item
              expand-separator
              :content-inset-level="0.5"
              icon="receipt"
              label="Categorias"
            >
              <q-item-section side>
                <q-btn
                  label="Agregar"
                  :to="{ name: 'categorias' }"
                  size="md"
                  flat
                  icon="add"
                  no-caps
                  color="primary"
                ></q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              :content-inset-level="0.5"
              icon="receipt"
              label="Empresas"
            >
              <q-item-section side>
                <q-btn
                  label="Agregar"
                  :to="{ name: 'empresas' }"
                  size="md"
                  flat
                  icon="add"
                  no-caps
                  color="primary"
                ></q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Almacen"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'almacens' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Unidad de Medidad"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'medida' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Presentación del Producto"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'presentaciones' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Producto"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'productos' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Tipo de Pagos"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  to="/FormaPago"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Roles de Usuario"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'roles' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
            <q-expansion-item
              :content-inset-level="0.5"
              expand-separator
              icon="schedule"
              label="Usuario"
            >
              <q-item-section side>
                <q-btn
                  size="md"
                  flat
                  icon="add"
                  color="primary"
                  no-caps
                  :to="{ name: 'usuarios' }"
                  label="Agregar"
                >
                </q-btn>
              </q-item-section>
            </q-expansion-item>
          </q-expansion-item>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- <q-footer class="bg-grey-1">
          <q-card-section class="col-12 text-right no-padding">
            <div class="text-body2 col-12 text-grey-8 text-weight-bold">
              © 2022 Inventario.
              <q-btn
                size="10px"
                :icon="fabInstagram"
                flat
                dense
                color="grey-8"
              ></q-btn>
              <q-btn
                size="10px"
                :icon="fabFacebook"
                flat
                dense
                color="grey-8"
              ></q-btn>
              <q-btn
                size="10px"
                :icon="fabGithub"
                flat
                dense
                color="grey-8"
              ></q-btn>
            </div>
          </q-card-section>
        </q-footer> -->
    <EssentialLink />
  </q-layout>
</template>

<script>
import {
  fabGithub,
  fabFacebook,
  fabInstagram,
} from "@quasar/extras/fontawesome-v6";
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      text: "",
      fabGithub,
      fabFacebook,
      fabInstagram,
    };
  },
};
</script>
