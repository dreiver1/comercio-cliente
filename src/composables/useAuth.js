import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/authStore'
import { Notify } from 'quasar'

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
      Notify.create({
        message: 'Login success',
        type: 'positive',
        icon: 'check'
      })
      return response.data
    } catch (error) {
      Notify.create({
        message: 'Login failed, email or password is incorrect',
        type: 'negative',
        icon: 'warning'
      })
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

  const register = async (data) => {
    try {
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    register,
    login,
    getMe
  }
}
