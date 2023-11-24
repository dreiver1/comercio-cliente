import { defineStore } from 'pinia'
import { ref } from 'vue'

export const authStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const accessToken = ref(null)

  return {
    authenticated,
    accessToken
  }
})
