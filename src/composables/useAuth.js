import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/authStore'

export default function useAuth() {
  const authStore = useAuthStore()

  const login = async (data) => {
    try {
      const payload = new FormData()
      payload.append('username', data.email)
      payload.append('password', data.password)
      const response = await api.postForm('/auth/token', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      authStore.accessToken = response.data.access_token
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getMe = async () => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    login,
    getMe
  }
}
