<template>
  <q-page class="flex flex-center">
    <div class="coulumn">
        <q-btn label="Adicionar produto" to="/addproduct"/>
        <div class="text-h1">Produtos</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
