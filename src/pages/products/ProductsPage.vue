<template>
  <q-page class="row flex-center full-widht">
    <div class="text-h1">Produtos</div>
    <div class="coulumn col-9 itens-end">
        <q-btn label="Adicionar produto" to="/addproduct"/>
        <q-list bordered separator>
          <q-item v-for="product in listProducts" v-bind:key="product.id" v-ripple class="flex justify-between">
            <div class="text q-ma-sm col-4">Nome: {{ product.name }}</div>
            <div class="text q-ma-sm col-2">R$ {{ product.price }}</div>
            <div class="text q-ma-sm col-2">Qtde: {{ product.quantity }}</div>
            <q-btn label="Editar" flat @click="editProduct(product.id)"/>
          </q-item>
        </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAPI from 'src/composables/useAPI'
import { useProductsStore } from 'src/stores/ProductsStore'
import { useRouter } from 'vue-router'

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
    const route = useRouter()
    const product = useProductsStore()
    const editProduct = (id) => {
      const aux = listProducts.value.find(product => product.id === id)
      console.log(aux.name)
      product.name = aux.name
      product.id = id
      product.description = aux.description
      product.quantity = aux.quantity
      product.price = aux.price
      route.push('putproduct')
    }
    return {
      listProducts,
      editProduct
    }
  }
})
</script>
