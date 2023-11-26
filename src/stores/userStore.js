import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('auth', () => {
  const user = ref(null)

  return {
    user
  }
})
