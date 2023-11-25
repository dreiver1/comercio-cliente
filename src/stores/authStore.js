import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const accessToken = ref('')

  return {
    authenticated,
    accessToken
  }
}, { persist: true })
