<template>
  <div class="row full-width itens-center">
    <div class="q-pa-md col-12">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="col-8 q-pa-md">
      <q-btn label="adicionar produto" align="center" color="primary"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useAPI from 'src/composables/useAPI'
import { usePDVStore } from 'src/stores/ProductsStore'
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Produto',
    field: 'name'
  },
  { name: 'price', label: 'Preço', field: 'price', sortable: true },
  { name: 'quantity', label: 'quantidade', field: 'quantidade', sortable: true }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    price: 159,
    quantidade: 24
  }
]

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const pdv = usePDVStore()
    const products = useAPI('products')
    const findItem = (name) => {
      products.list(name)
    }
    const addItem = (product) => {
      pdv.itens.value.push(product)
    }
    return {
      findItem,
      columns,
      addItem,
      rows
    }
  }
})
</script>
