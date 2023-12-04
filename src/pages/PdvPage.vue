<template>
  <div class="row full-width items-center justify-center">
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
      bordered
      title="Treats"
      :rows="items"
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
              <q-input type="number" v-model="scope.value" dense autofocus />
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
import useAPI from 'src/composables/useAPI'
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
      pdv.items = []
    }
    const finalize = ref(false)
    const persistent = ref(false)
    const pdv = usePDVStore()
    const rows = pdv.items
    const products = useAPI('products')
    const items = ref([])
    const findItem = async (name) => {
      const product = await products.list(name)
      const updatedItems = product.map((item) => {
        return {
          ...item,
          quantity: item.quantity / item.quantity
        }
      })
      items.value = updatedItems
    }
    const total = ref(0)
    const selected = ref([])
    const addItem = () => {
      selected.value[0].quantity = 1
      pdv.items.push(selected.value[0])
      total.value = total.value + selected.value[0].price
    }
    const text = ref('')
    const conclude = () => {
      pdv.conclude()
      finalize.value = true
    }
    return {
      itemsColumns,
      persistent,
      selected,
      findItem,
      conclude,
      finalize,
      newOrder,
      columns,
      addItem,
      items,
      total,
      text,
      rows
    }
  }
})
</script>
