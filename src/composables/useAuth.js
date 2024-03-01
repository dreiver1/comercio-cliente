import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/authStore'
import { Notify } from 'quasar'

export default function useAuth() {
  const authStore = useAuthStore()

  const login = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password
      }
      authStore.accessToken = ''
      const response = await api.post('/user/login', payload)
      authStore.accessToken = response.data.token

      if (authStore.accessToken !== '' && authStore.accessToken !== null && typeof variavel !== 'undefined') {
        Notify.create({
          message: 'Login success',
          type: 'positive',
          icon: 'check'
        })
      }
      return response.data
    } catch (error) {
      console.log(error)
      Notify.create({
        message: 'Login failed, email or password is incorrect',
        type: 'negative',
        icon: 'warning'
      })
    }
  }

  const getMe = async () => {
    try {
      const response = await api.get('/user/login')
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
