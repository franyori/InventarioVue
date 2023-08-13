<template>
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-item class="bg-primary" dark>
            <q-item-section>
              <q-item-label>
                <q-btn
                  dense
                  label="costo"
                  icon-right="edit"
                  flat
                  glossy
                  class="full-width"
                  @click="openModal()"
                ></q-btn
              ></q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="col-6" vertical>
              <q-item-label caption class="q-pb-md"
                >Precio costo:
              </q-item-label>
              <q-item-label caption>Precio venta: </q-item-label>
              <q-item-label caption class="q-pt-md">Impuesto: </q-item-label>
            </q-card-section>
            <q-card-section class="col-6" vertical>
              <q-item-label overline class="q-pb-md text-bold">{{
                store.ProductoId.costo_prod
              }}</q-item-label>
              <q-item-label overline class="text-bold">{{
                store.ProductoId.precio_prod
              }}</q-item-label>
              <q-item-label overline class="q-pt-md text-bold">{{
                store.ProductoId.impuesto_prod + '%'
              }}</q-item-label>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <ModalEditCosto :persistent="persistent" @closeModel="persistent = false" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
//import ModalEditCosto from '../../components/ProductoEdit/ModalEditCosto.vue'
import { useProductoStore } from '../../stores/ProductoStore'
import { useRoute } from 'vue-router'

const router = useRoute()
const store = useProductoStore()

onMounted(async()=>{
await store.ProductoById(router.params.id)
})

const persistent = ref(false)

const openModal = () => {
  persistent.value = true
}
</script>
<style lang="sass" scoped>
.my-card
  width: 550px
  height: 170px
  //max-width: 350px
</style>
