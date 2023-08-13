<template>
  <q-page>
    <div class="col row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
        <div class="q-pa-md">
          <q-carousel
            swipeable
            height="170px"
            animated
            v-model="slide"
            :autoplay="autoplay"
            ref="carousel"
            infinite
          >
            <q-carousel-slide :name="1" img-src="../assets/trade07.jpg" />
            <q-carousel-slide :name="2" img-src="../assets/trade08.jpg" />

            <template v-slot:control>
              <q-carousel-control
                position="bottom-right"
                :offset="[20, 20]"
                class="q-gutter-xs"
              >
                <q-btn
                  push
                  round
                  dense
                  color="primary"
                  text-color="black"
                  icon="arrow_left"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  push
                  round
                  dense
                  color="primary"
                  text-color="black"
                  icon="arrow_right"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </div>
      </div>
      <Caracteristicas />
      <Precio />
    </div>
    <div class="row">
      <Movimiento />
      <Stock />
    </div>
  </q-page>
</template>
<script setup>
import Precio from '../components/ProductoEdit/PrecioView.vue'
import Caracteristicas from '../components/ProductoEdit/CaracteristicasView.vue'
import Movimiento from '../components/ProductoEdit/MovimientoView.vue'
import Stock from 'src/components/ProductoEdit/StockView.vue'

const slide = 1
const autoplay = true

</script>
