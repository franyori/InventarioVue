<template>
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-item class="bg-primary" dark>
            <q-item-section>
              <q-item-label>
                <q-btn
                  dense
                  label="stock"
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
              <q-item-label caption class="q-pb-md q-pt-sm"
                >Cantidad inicial:
              </q-item-label>
              <q-item-label caption>Cantidad dispinible: </q-item-label>
              <q-item-label caption class="q-pt-md"
                >Notificar antes de:
              </q-item-label>
            </q-card-section>
            <q-card-section class="col-6" vertical>
              <q-item-label overline class="text-bold">
                <q-chip size="md" dark dense color="warning" >{{
                 store.AlmacenProductoId.cantidad_inicial
                }}</q-chip></q-item-label
              >
              <q-item-label overline class="text-bold"
                ><q-chip size="md" dark dense color="positive">{{
                   store.AlmacenProductoId.cantidad_actual
                }}</q-chip></q-item-label
              >
              <q-item-label overline class=" text-bold"
                ><q-chip size="md" dark dense color="red">{{
                   store.AlmacenProductoId.cantidad_reservda
                }}</q-chip></q-item-label
              >
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <ModalEditCosto
      :persistent="persistent"
      @closeModel="persistent = false"
    />
    </div> 
</template>
<script setup>
//import ModalEditCosto from './ModalEditCosto.vue'
import { onMounted, ref } from 'vue'
import {useAlmacenStore} from '../../stores/AlmcenStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useAlmacenStore()

const persistent = ref(false)

onMounted(async()=>{
await store.AlmacenByIdProducto(route.params.id)
})
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
