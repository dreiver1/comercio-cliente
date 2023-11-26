import { api } from 'src/boot/axios'

export default function useUser() {
  const getUsers = async () => {
    try {
      const response = await api.get('/users')
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const createUser = async (payload) => {
    try {
      const response = await api.post('/users', payload)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateUser = async (payload) => {
    try {
      const response = await api.put('/users', payload)
      return response.status
    } catch (error) {
      throw new Error(error)
    }
  }

  const deleteUser = async (uuid) => {
    try {
      const data = await api.delete(`/users/${uuid}`)
      return data.status
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    getUsers,
    updateUser,
    createUser,
    deleteUser
  }
}
