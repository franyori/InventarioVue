<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar producto
            </div>
          </q-card-section>
        </div>

        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addProducto()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="nombre_prod"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="costo_prod"
              label="Precio costo"
              hint="Valor inicial"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba precio costo'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="precio_prod"
              label="Precio venta"
              hint="Valor de venta"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba precio venta'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="codigo_prod"
              label="Código"
              hint="Numero identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba código']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              type="number"
              min="0"
              standout
              bg-color="accent"
              filled
              v-model="impuesto_prod"
              label="Impuesto"
              hint="Impuesto agregado"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba impuesto']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="utilidad_prod"
              label="Utilidad"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba utilidad']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="descripcion_prod"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="categoriaId"
              :options="apicategoria"
              :option-label="
                apicategoria =>
                  apicategoria === null ? null : apicategoria.nombre_categoria
              "
              :option-value="
                apicategoria => (apicategoria === null ? null : apicategoria.id)
              "
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Categoria "
              hint="Seleccione categoria"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              standout
              bg-color="accent"
              :options="apibodega"
              :option-label="
                apibodega =>
                  apibodega === null ? null : apibodega.nombre_bodega
              "
              :option-value="
                apibodega => (apibodega === null ? null : apibodega.id)
              "
              emit-value
              map-options
              filled
              v-model="bodegaId"
              label="Almacen"
              hint="Seleccione Almacen"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              standout
              bg-color="accent"
              :options="apipresent"
              :option-label="
                apipresent =>
                  apipresent === null ? null : apipresent.nombre_present
              "
              :option-value="
                apipresent => (apipresent === null ? null : apipresent.id)
              "
              emit-value
              map-options
              filled
              v-model="presentacionProdId"
              label="Presentación"
              hint="Seleccione presentación"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="col col-12 q-pt-xs">
          <p class="text-subtitle2">Stock</p>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="cantidad_inicial"
              label="Cantidad inicial"
              hint="Valor inicial"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba cantidad inicial'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              standout
              type="number"
              bg-color="accent"
              filled
              v-model="cantidad_reservda"
              label="Notificación"
              hint="Alerta sin stock"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba alerta',
                val =>
                  val <  parseInt(notificacion) ||
                  'Debe indicar un valor menor a la cantidad inicial'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
        </div>
        <q-card-actions class="q-pt-md">
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn no-caps label="Limpiar" type="reset" color="primary" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { computed, onUpdated, ref } from 'vue'
import { useCategoriaStore } from '../../stores/CategoriaStore'
import { useAlmacenStore } from '../../stores/AlmcenStore'
import { usePresentacionStore } from '../../stores/PresentacionStore'
import { useProductoStore } from '../../stores/ProductoStore'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const storeCategoria = useCategoriaStore()
const apicategoria = computed(() => storeCategoria.Categoria)

const storeAlmacen = useAlmacenStore()
const apibodega = computed(() => storeAlmacen.Almacen)

const storePresentacion = usePresentacionStore()
const apipresent = computed(() => storePresentacion.Presentacion)

const store = useProductoStore()

const notificacion = computed(()=> cantidad_inicial.value)

const nombre_prod = ref('')
const descripcion_prod = ref('')
const costo_prod = ref('')
const precio_prod = ref('')
const codigo_prod = ref('')
const impuesto_prod = ref('')
const utilidad_prod = ref('')
const bodegaId = ref('')
const categoriaId = ref('')
const presentacionProdId = ref('')
const cantidad_inicial = ref('')
const cantidad_reservda = ref('')

const onReset = () => {
  nombre_prod.value = null
  descripcion_prod.value = null
  costo_prod.value = null
  precio_prod.value = null
  codigo_prod.value = null
  impuesto_prod.value = null
  utilidad_prod.value = null
  bodegaId.value = null
  categoriaId.value = null
  presentacionProdId.value = null
  cantidad_inicial.value = null
  cantidad_reservda.value = null
}

const addProducto = async () => {
  const params = ref({
    nombre_prod: nombre_prod,
    descripcion_prod: descripcion_prod,
    costo_prod: costo_prod,
    precio_prod: precio_prod,
    codigo_prod: codigo_prod,
    impuesto_prod: impuesto_prod,
    utilidad_prod: utilidad_prod,
    bodegaId: bodegaId,
    categoriaId: categoriaId,
    presentacionProdId: presentacionProdId,
    cantidad_inicial: cantidad_inicial,
    cantidad_reservda: cantidad_reservda
  })
  await store.ProductoAdd(params.value)
  onReset()
  instance.proxy.$forceUpdate()

}

onUpdated(async()=>{
await store.ProductoAll()
})
</script>
