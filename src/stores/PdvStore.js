import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAPI from 'src/composables/useAPI'

export const usePDVStore = defineStore('pdv', {
  state: () => ({
    itens: ref([]),
    product: useAPI('products'),
    transation: useAPI('transation'),
    item: useAPI('itens')
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async conclude () {
      const Transation = await this.transation.post({})
      for (let i = 0; i < this.itens.length; i++) {
        const Product = await this.product.getById(this.itens[i].uuid)
        const responseData = await this.item.post({
          total_amount: 0,
          product: Product,
          transation: Transation
        })
        console.log(responseData)
      }
    }
  }
})
