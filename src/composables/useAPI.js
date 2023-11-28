import { api } from 'src/boot/axios'
export default function useAPI (url) {
  const list = async (name) => {
    if (name) {
      try {
        const data = await api.get(`${url}/?name=${name}`)
        return data.data
      } catch (error) {
        throw new Error(error)
      }
    } else {
      try {
        const data = await api.get(url)
        return data.data
      } catch (error) {
        throw new Error(error)
      }
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
  const post = async (dados) => {
    try {
      const data = await api.post(url, dados)
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
  const upImage = async (image) => {
    try {
      const formData = new FormData()
      formData.append('file', image)

      // Make a POST request with Axios
      const response = await api.postForm('/products/upload', formData, {
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
