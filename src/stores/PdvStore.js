import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAPI from 'src/composables/useAPI'

export const usePDVStore = defineStore('pdv', {
  state: () => ({
    persistent: ref(false),
    finalize: ref(false),
    selected: ref(),
    items: ref([]),
    product: useAPI('products'),
    transation: useAPI('transation'),
    item: useAPI('itens'),
    transationId: ref(''),
    total: ref(0),
    searchRows: ref([]),
    orderColumns: [
      { name: 'name', required: true, label: 'Produto', field: 'name' },
      { name: 'quantity', label: 'quantidade', field: 'quantity', sortable: true },
      { name: 'price', label: 'Preço', field: 'price', sortable: true }
    ],
    serchColumns: [
      { name: 'name', required: true, label: 'Nome', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'quantity', label: 'quantidade', field: 'quantity', sortable: true },
      { name: 'price', label: 'Preço', field: 'price', sortable: true },
      { name: 'selected' }
    ],
    search: ref('')
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async conclude () {
      const Transation = await this.transation.post({})
      for (let i = 0; i < this.items.length; i++) {
        const Product = await this.product.getById(this.items[i].uuid)
        const payload = {
          total_amount: Product[0].quantity,
          product: Product[0],
          transation: Transation
        }
        const responseData = await this.item.post(payload)
        console.log(responseData)
      }
    },
    async printInvoice () {

    }

  }
})
