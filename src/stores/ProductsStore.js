import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    id: '',
    name: '',
    quantity: 0,
    description: '',
    price: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})
