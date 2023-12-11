<template>
  <div class="row full-width items-center justify-center">
    <div class="q-pa-md col-12">
      <q-table
        title="Venda"
        :rows="OrderRows"
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
        <q-input v-model="search" label="Produto:" @update:model-value="findItem"/>
      </q-card-section>
      <q-table
      bordered
      title="Adicionar"
      :rows="SearchRows"
      :columns="itemsColumns"
      row-key="name"
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="selected" :props="props">
            <q-checkbox
              v-model="props.selected"
              :disable="props.row.disableSelection"
            />
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
            <q-popup-edit v-model="props.row.quantity" v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus @update:model-value="updadeSearhRows(scope.value, props.row.uuid)" />
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
      <q-card-actions align="right" class="text-teal">
        <q-btn flat label="OK" v-close-popup @click="addItem"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="finalize" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Venda finalizada</div>
      </q-card-section>
      <q-card-actions align="right" class="text-teal">
        <q-btn flat label="Nova venda" v-close-popup @click="newOrder"/>
        <q-btn flat label="Iprimimir Cumpom" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { usePDVStore } from 'src/stores/PdvStore'

const itemsColumns = [
  { name: 'name', required: true, label: 'Nome', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'quantity', label: 'quantidade', field: 'quantity', sortable: true },
  { name: 'price', label: 'Preço', field: 'price', sortable: true },
  { name: 'selected' }
]
const columns = [
  { name: 'name', required: true, label: 'Produto', field: 'name' },
  { name: 'quantity', label: 'quantidade', field: 'quantity', sortable: true },
  { name: 'price', label: 'Preço', field: 'price', sortable: true }
]

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const newOrder = () => {
      pdv.$reset()
    }
    const updadeSearhRows = (newQuantity, rowId) => {
      console.log(rowId, newQuantity)
      console.log(SearchRows.value[0])
      for (let i = 0; i < SearchRows.value.length; i++) {
        if (SearchRows.value[i].uuid === rowId) {
          SearchRows.value[i].quantity = parseInt(newQuantity)
        }
      }
    }
    const finalize = ref(false)
    const persistent = ref(false)
    const pdv = usePDVStore()
    const OrderRows = ref(pdv.items)
    const SearchRows = ref([])
    const findItem = async (name) => {
      const product = await pdv.product.getByName(name)
      console.log(product)
      const updatedItems = product.map((item) => {
        return {
          ...item,
          quantity: item.quantity / item.quantity
        }
      })
      SearchRows.value = updatedItems
    }
    const total = ref(0)
    const selected = ref()
    let itemAlreadyExist = false
    const addItem = () => {
      pdv.items.forEach(element => {
        if (element.uuid === selected.value[0].uuid) {
          element.quantity += parseInt(selected.value[0].quantity)
          itemAlreadyExist = true
        }
      })
      if (!itemAlreadyExist) {
        pdv.items.push(selected.value[0])
      }
      total.value = total.value + selected.value[0].price
      itemAlreadyExist = false
      search.value = ''
      selected.value = []
    }
    const search = ref('')
    const conclude = () => {
      pdv.$reset()
      pdv.conclude()
      finalize.value = true
      OrderRows.value = []
      total.value = 0
    }
    return {
      updadeSearhRows,
      itemsColumns,
      persistent,
      SearchRows,
      OrderRows,
      selected,
      findItem,
      conclude,
      finalize,
      newOrder,
      columns,
      addItem,
      search,
      total,
      pdv
    }
  }
})
</script>
