<template>
  <q-page class="row flex-center full-widht">
    <div class="text-h1">Produtos</div>
    <div class="coulumn col-9 itens-end">
        <q-btn label="Adicionar produto" to="/addproduct"/>
        <q-list bordered separator>
          <q-item v-for="product in listProducts" v-bind:key="product.id" clickable v-ripple class="flex justify-between">
            <div class="text q-ma-sm col-4">Nome: {{ product.name }}</div>
            <div class="text q-ma-sm col-2">Preço: {{ product.price }}</div>
            <div class="text q-ma-sm col-2">Quantidade: {{ product.quantity }}</div>
            <q-btn label="Editar" flat/>
          </q-item>
        </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAPI from 'src/composables/useAPI'

const api = useAPI('products')

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const listProducts = ref([])
    onMounted(async () => {
      try {
        const response = await api.list()
        listProducts.value = response
      } catch (error) {
        throw new Error(error)
      }
    })
    return {
      listProducts
    }
  }
})
</script>
