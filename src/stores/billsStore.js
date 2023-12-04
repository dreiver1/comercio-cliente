import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { date } from 'quasar'

export const useBillStore = defineStore('bill', () => {
  // const dateNow = date.formatDate(Date(), 'YYYY-MM-DD')
  const billDialog = ref(false)
  const billCreate = ref({
    business: '',
    reference: '',
    value: '',
    febraban: '',
    due_date: null,
    is_paid: false,
    description: '',
    payment_date: null,
    payment_method: ''
  })
  const billEditDialog = ref(false)
  const billEdit = ref({})
  const billList = ref([])

  return {
    billList,
    billEdit,
    billCreate,
    billDialog,
    billEditDialog
  }
})
