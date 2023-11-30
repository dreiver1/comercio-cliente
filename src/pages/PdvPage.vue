<template>
  <div class="row full-width itens-center justify-center">
    <div class="q-pa-md col-12">
      <q-table
        title="Vendas"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="bg-primary text-white col-12 q-pa-md row flex-center">
      <div class="text-h6">total = {{ total }}</div>
    </div>
    <div class="col-12 q-pa-md row justify-end">
      <q-btn class="q-mx-sm" label="concluir" color="primary" @click="conclude"/>
      <q-btn class="q-mx-sm" label="adicionar" color="white" text-color="black" @click="persistent = true"/>
      <q-btn class="q-mx-sm" label="cancelar" color="red" :to="{ name: 'dashboard' }"  />
    </div>
  </div>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Adicionar produto</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="text" label="Produto:" @update:model-value="findItem"/>
      </q-card-section>

      <q-table
        flat bordered
        title="Treats"
        :rows="itens"
        :columns="itensColumns"
        row-key="name"
        selection="single"
        v-model:selected="selected"
      />
      <q-card-actions align="right" class="text-teal">
        <q-btn flat label="OK" v-close-popup @click="addItem"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAPI from 'src/composables/useAPI'
import { usePDVStore } from 'src/stores/PdvStore'

const itensColumns = [
  { name: 'name', required: true, label: 'Dessert (100g serving)', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'quantity', label: 'quantidade', field: 'quantidade', sortable: true },
  { name: 'price', label: 'Preço', field: 'price', sortable: true }
]
const columns = [
  { name: 'name', required: true, label: 'Produto', field: 'name' },
  { name: 'quantity', label: 'quantidade', field: 'quantity', sortable: true },
  { name: 'price', label: 'Preço', field: 'price', sortable: true }
]

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const persistent = ref(false)
    const pdv = usePDVStore()
    const rows = pdv.itens
    const products = useAPI('products')
    const itens = ref([])
    const findItem = async (name) => {
      const product = await products.list(name)
      itens.value = product
    }
    const total = ref(0)
    const selected = ref()
    const addItem = () => {
      selected.value[0].quantity = 1
      pdv.itens.push(selected.value[0])
      total.value = total.value + selected.value[0].price
    }
    const text = ref('')
    const conclude = pdv.conclude
    return {
      itensColumns,
      persistent,
      selected,
      findItem,
      conclude,
      columns,
      addItem,
      itens,
      total,
      text,
      rows
    }
  }
})
</script>
