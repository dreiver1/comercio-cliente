import { api } from 'src/boot/axios'

export default function useBills() {
  const getBills = async () => {
    try {
      const response = await api.get('/bills')
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const createBill = async (payload) => {
    try {
      const response = await api.post('/bills', payload)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateBill = async (payload) => {
    console.log(payload)
    try {
      const response = await api.put('/bills', payload)
      return response.status
    } catch (error) {
      throw new Error(error)
    }
  }

  const deleteBill = async (uuid) => {
    try {
      const data = await api.delete(`/bills/${uuid}`)
      return data.status
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    getBills,
    updateBill,
    createBill,
    deleteBill
  }
}
