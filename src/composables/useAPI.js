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
  const update = async (data) => {
    try {
      const response = await api.put(url, data)
      return response.status
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
  const post = async (payload) => {
    try {
      const response = await api.post(url, payload)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  const upImage = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await api.postForm(`${url}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    upImage,
    list,
    update,
    post,
    remove
  }
}
