import { api } from 'src/boot/axios'
export default function useAPI (url) {
  const getById = async (id) => {
    try {
      const response = await api.get(`${url}/?uuid=${id}`)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  const getByName = async (name) => {
    try {
      const response = await api.get(`${url}/?name__icontains=${name}`)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const list = async () => {
    try {
      const response = await api.get(url)
      return response.data
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

  const remove = async (id, condition) => {
    try {
      const response = await api.delete(`${url}/${id}/${condition}`)
      return response.status
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
      const response = await api.postForm(`${url}/image`, formData, {
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
    getById,
    upImage,
    getByName,
    list,
    update,
    post,
    remove
  }
}
