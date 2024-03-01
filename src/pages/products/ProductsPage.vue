<template>
  <q-page padding>
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
                :value="props.row.pictures[0].source"
              >
                <q-img
                  :src="props.row.pictures ? `${props.row.pictures[0].source}` : `http://localhost:8080/files/1709230306766_27562_EES-Still.jpg`"
                  :ratio="16/9"
                  :style="{
                    'max-width': '100px',
                    'max-height': '100px'
                  }"
                />
                <span class="q-px-lg">{{ props.row.title }}</span>
              </q-td>
              <q-td
                key="price"
                :value="props.row.price"
              >
                {{ props.row.price }}
              </q-td>
              <q-td
                key="quantity"
                :value="props.row.available_quantity"
              >
                {{ props.row.available_quantity }}
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

const api = useAPI('item')

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const listProducts = ref([])
    onMounted(async () => {
      try {
        const response = await api.list()
        console.log(response)
        const items = []
        const data = response.forEach(element => {
          if (element.pictures) {
            console.log(element.pictures)
            element.pictures = JSON.parse(element.pictures)
          }
          items.push(element)
        })
        console.log(data)
        listProducts.value = items
      } catch (error) {
        throw new Error(error)
      }
    })
    const route = useRouter()
    const product = useProductsStore()
    const img = ref('')
    const editProduct = (id) => {
      const aux = listProducts.value.find(product => product.id === id)
      product.title = aux.title
      product.id = id
      product.description = aux.description
      product.available_quantity = aux.available_quantity
      product.price = aux.price
      product.pictures = aux.pictures
      product.condition = aux.condition
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
