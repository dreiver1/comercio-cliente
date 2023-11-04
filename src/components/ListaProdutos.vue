<template>
  <q-item clickable v-ripple style="padding: 10px; border: 1px solid black; ">
    <q-item-section>
      <q-item-label>Nome: {{ name }} </q-item-label>
      <q-item-label>Preço: {{ price }} </q-item-label>

    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'listaProdutos',
  props: {
    name: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    }
  }
})
</script>
