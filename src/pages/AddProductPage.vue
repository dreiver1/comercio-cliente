<template>
    <q-page class="page">
      <div class="text-h1">Adicionar Produto</div>
    </q-page>
  </template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IndexPage'
})
</script>
<style>

.page{
  display: flex;
  flex-direction: row;
}

@media screen and (max-whidth: 768px){
  .page{
    flex-direction: column;
  }
}

</style>
