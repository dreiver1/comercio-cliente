import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAPI from 'src/composables/useAPI'

export const usePDVStore = defineStore('pdv', {
  state: () => ({
    items: ref([]),
    product: useAPI('products'),
    transation: useAPI('transation'),
    item: useAPI('itens'),
    transationId: ref('')
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async conclude () {
      const Transation = await this.transation.post({})
      for (let i = 0; i < this.itens.length; i++) {
        const Product = await this.product.getById(this.itens[i].uuid)
        const payload = {
          total_amount: Product[0].quantity,
          product: Product[0],
          transation: Transation
        }
        console.log(payload)
        const responseData = await this.item.post(payload)
        console.log(responseData)
      }
    }
  }
})
