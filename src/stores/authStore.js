import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')

  const validateToken = async () => {
    const { payload } = useJwt(accessToken.value)
    const tokenValid = await payload.value.exp < Date.now() / 1000
    if (tokenValid) {
      return true
    }
  }

  return {
    validateToken,
    accessToken
  }
}, { persist: true })
