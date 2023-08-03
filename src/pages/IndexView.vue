<template>
  <q-page class="flex flex-center">  
  <div class="q-pl-xl q-pr-xl q-pb-xl bg-blue-2" style="border-radius: 8px; width: 30vw;">
    <p class="text-h6 text-center q-pa-md text-primary">Acceso</p>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-input
        ref="email"
        standout
        dense
        type="email"
        bg-color="grey-2"
        input-class="text-black"
        v-model="email"
        label="Correo *"
        hint="Correo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su correo']"
      />

      <q-input
        ref="pass"
        standout
        type="password"
        dense
        bg-color="grey-2"
        input-class="text-black"
        v-model="password"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escriba su contraseña']"
      />

      <div align="center">
        <q-btn padding="2px 52px 2px 52px" no-caps dense label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn padding="2px 52px 2px 52px" :loading="loading" no-caps dense label="Entrar" type="submit" color="primary" />
      </div>
    </form>
  </div>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'


</script>