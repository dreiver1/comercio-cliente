import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { useJwt } from '@vueuse/integrations/useJwt'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')

  const validateToken = () => {
    console.log(accessToken.value)
    if (accessToken.value !== '' && accessToken.value !== null && typeof accessToken.value === 'string') {
      return true
    } else {
      return false
    }
  }

  return {
    validateToken,
    accessToken
  }
}, { persist: true })
