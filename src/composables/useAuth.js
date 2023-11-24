import { api } from 'src/boot/axios'

export default function useAuth() {
  const login = async (payload) => {
    try {
      const teste = new FormData()
      teste.append('username', payload.email)
      teste.append('password', payload.password)
      const response = await api.postForm('/auth/token', teste, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    login
  }
}
