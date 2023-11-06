import { api } from 'src/boot/axios'
export default function useAPI(url) {
  const list = async () => {
    try {
      const data = await api.get(url)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
  const update = async (date) => {
    try {
      const data = await api.put(url, date)
      return data.status
    } catch (error) {
      throw new Error(error)
    }
  }
  const post = async (dados, file) => {
    try {
      const data = await api.post(url, dados, file)
      return data.status
    } catch (error) {
      throw new Error(error)
    }
  }
  const remove = async (id) => {
    try {
      const data = await api.delete(`${url}/${id}`)
      return data.status
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    list,
    update,
    post,
    remove
  }
}
