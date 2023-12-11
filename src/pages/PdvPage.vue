<template>
  <div class="row full-width items-center justify-center">
    <div class="q-pa-md col-12">
      <q-table
        title="Venda"
        :rows="pdv.items"
        :columns="pdv.orderColumns"
        row-key="name"
      />
    </div>
    <div class="bg-primary text-white col-12 q-pa-md row flex-center">
      <div class="text-h6">total = {{ pdv.total }}</div>
    </div>
    <div class="col-12 q-pa-md row justify-end">
      <q-btn class="q-mx-sm" label="concluir" color="primary" @click="conclude"/>
      <q-btn class="q-mx-sm" label="adicionar" color="white" text-color="black" @click="pdv.persistent = true"/>
      <q-btn class="q-mx-sm" label="cancelar" color="red" :to="{ name: 'dashboard' }"  />
    </div>
  </div>

  <q-dialog v-model="pdv.persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Adicionar produto</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="pdv.search" label="Produto:" @update:model-value="findItem"/>
      </q-card-section>
      <q-table
      bordered
      title="Adicionar"
      :rows="pdv.searchRows"
      :columns="pdv.serchColumns"
      row-key="name"
      selection="single"
      v-model:selected="pdv.selected"
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
  <q-dialog v-model="pdv.finalize" persistent transition-show="scale" transition-hide="scale">
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
import { defineComponent } from 'vue'
import { usePDVStore } from 'src/stores/PdvStore'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const newOrder = () => {
      pdv.$reset()
    }
    const updadeSearhRows = (newQuantity, rowId) => {
      for (let i = 0; i < pdv.searchRows.length; i++) {
        if (pdv.searchRows[i].uuid === rowId) {
          pdv.searchRows[i].quantity = parseInt(newQuantity)
        }
      }
    }
    const pdv = usePDVStore()
    const findItem = async (name) => {
      const product = await pdv.product.getByName(name)
      const updatedItems = product.map((item) => {
        return {
          ...item,
          quantity: item.quantity / item.quantity
        }
      })
      pdv.searchRows = updatedItems
    }
    let itemAlreadyExist = false
    const addItem = () => {
      pdv.items.forEach(element => {
        if (element.uuid === pdv.selected[0].uuid) {
          element.quantity += parseInt(pdv.selected[0].quantity)
          itemAlreadyExist = true
          pdv.total += (pdv.selected[0].price * pdv.selected[0].quantity)
        }
      })
      if (!itemAlreadyExist) {
        pdv.items.push(pdv.selected[0])
      }
      pdv.total += (pdv.selected[0].price * pdv.selected[0].quantity)
      itemAlreadyExist = false
      pdv.search = ''
      pdv.selected.pop()
      pdv.searchRows = []
    }
    const conclude = () => {
      pdv.conclude()
      pdv.finalize = true
    }
    return {
      updadeSearhRows,
      findItem,
      conclude,
      newOrder,
      addItem,
      pdv
    }
  }
})
</script>
