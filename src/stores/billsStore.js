import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBillStore = defineStore('bill', () => {
  const billDialog = ref(false)
  const billUpdateData = ref(null)
  const billList = ref([])

  return {
    billList,
    billDialog,
    billUpdateData
  }
})
