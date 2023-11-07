<template>
  <q-page class="row flex-center full-widht">
    <div class="text-h1">PRODUTOS</div>
    <div class="coulumn col-9 itens-end">
        <q-btn label="Adicionar produto" to="/addproduct"/>
        <!-- <q-list bordered separator>
          <q-item v-for="product in listProducts" v-bind:key="product.id" v-ripple class="flex justify-between">
            <div class="text q-ma-sm col-4">Nome: {{ product.name }}</div>
            <div class="text q-ma-sm col-2">R$ {{ product.price }}</div>
            <div class="text q-ma-sm col-2">Qtde: {{ product.quantity }}</div>
            <q-btn label="Editar" flat @click="editProduct(product.id)"/>
            <img :src="product.img" alt="img" srcset="">
          </q-item>
        </q-list> -->
        <div class="q-pa-md">
          <q-table
            grid
            title="Produtos"
            :rows="listProducts"
            :columns="columns"
            row-key="name"
          >
          <template v-slot:body-cell-imagem="props">
            <q-td :props="props">
              <img :src="props.row.img" alt="Imagem" style="max-width: 50px; max-height: 50px;">
            </q-td>
          </template>
          </q-table>
        </div>
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
        console.log(process.env.api)
      } catch (error) {
        throw new Error(error)
      }
    })
    const route = useRouter()
    const product = useProductsStore()
    const img = ref('')
    const editProduct = (id) => {
      const aux = listProducts.value.find(product => product.id === id)
      console.log(aux.name)
      product.name = aux.name
      product.id = id
      product.description = aux.description
      product.quantity = aux.quantity
      product.price = aux.price
      product.img = `http://localhost:8000/${aux.img}`
      route.push('putproduct')
    }

    const columns = [
      {
        name: 'product',
        required: true,
        label: 'Produto',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'price', label: 'Preço', sortable: true, field: row => row.price, format: val => `${val}` },
      { name: 'quantity', label: 'QTDE', field: row => row.quantity, format: val => `${val}` }
      // { name: 'img', label: 'Imagem', field: row => row.img, format: val => { return `<img src="${val}" alt="Imagem" style="max-width: 50px; max-height: 50px;" />` } }
    ]

    return {
      listProducts,
      editProduct,
      columns,
      img
    }
  }
})
</script>
