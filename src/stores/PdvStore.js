import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePDVStore = defineStore('pdv', {
  state: () => ({
    itens: ref([])
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
