import { defineStore } from 'pinia'
export const useProductsStore = defineStore('products', {
  state: () => ({
    title: '',
    category_id: '',
    price: '',
    currency_id: '',
    available_quantity: '',
    buying_mode: '',
    condition: '',
    listing_type_id: '',
    warranty_type: '',
    warranty_time: '',
    brand: '',
    ean: '',
    model: '',
    pictures: []
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
