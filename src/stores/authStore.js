import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const accessToken = ref('')

  const validateToken = async () => {
    const { payload } = useJwt(accessToken.value)
    if (accessToken.value !== '') {
      return payload.exp > Date.now() / 1000
    }
  }

  return {
    validateToken,
    authenticated,
    accessToken
  }
}, { persist: true })
