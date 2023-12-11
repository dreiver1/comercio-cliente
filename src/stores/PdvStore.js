import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAPI from 'src/composables/useAPI'

export const usePDVStore = defineStore('pdv', {
  state: () => ({
    items: ref([]),
    product: useAPI('products'),
    transation: useAPI('transation'),
    item: useAPI('itens'),
    transationId: ref(''),
    total: ref(0)
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    showItems () {
      console.log(this.items.length)
    },
    async conclude () {
      const Transation = await this.transation.post({})
      for (let i = 0; i < this.items.length; i++) {
        console.log(this.items[i])
        console.log('dentro do for')
        console.log(this.items[i] + 'aqui')
        const Product = await this.product.getById(this.items[i].uuid)
        const payload = {
          total_amount: Product[0].quantity,
          product: Product[0],
          transation: Transation
        }
        const responseData = await this.item.post(payload)
        console.log(responseData)
      }
    }
  }
})
