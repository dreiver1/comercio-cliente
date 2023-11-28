<template>
  <q-page class="row flex-center full-widht">
    <!-- <div class="text-h1">PRODUTOS</div> -->
    <div class="coulumn col-9 itens-end">
        <q-btn label="Adicionar produto" to="/addproduct"/>
        <div class="q-pa-md">
          <q-table
            title="Produtos"
            :rows="listProducts"
            :columns="columns"
            row-key="name"
          >
          <template v-slot:body="props">
            <q-tr @click="editProduct(props.row.id)">
              <q-td
                key="name"
                :value="props.row.img"
              >
                <q-img
                  :src="props.row.img ? `http://localhost:8000/${props.row.img}` : `http://localhost:8000/static/products/default.png`"
                  :ratio="16/9"
                  :style="{
                    'max-width': '100px',
                    'max-height': '100px'
                  }"
                />
                <span class="q-px-lg">{{ props.row.name }}</span>
              </q-td>
              <q-td
                key="price"
                :value="props.row.price"
              >
                {{ props.row.price }}
              </q-td>
              <q-td
                key="quantity"
                :value="props.row.quantity"
              >
                {{ props.row.quantity }}
              </q-td>
            </q-tr>
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
      } catch (error) {
        throw new Error(error)
      }
    })
    const route = useRouter()
    const product = useProductsStore()
    const img = ref('')
    const editProduct = (id) => {
      const aux = listProducts.value.find(product => product.id === id)
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
        name: 'name',
        label: 'Product',
        field: 'name',
        align: 'center',
        sortable: true
      },
      { name: 'price', label: 'Preço', field: 'price', align: 'left', sortable: true },
      { name: 'quantity', label: 'Quantidade', field: 'quantity', align: 'left', sortable: true }
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
