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
  const update = async (data, file) => {
    console.log('filé', file)
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))
    formData.append('file', file)
    // if (file) {
    // }
    console.log('form', formData)
    try {
      const data = await api.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
  const post = async (data, file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(data))
      const response = await api.postForm(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
  // const upImage = async (image) => {
  //   try {
  //     const formData = new FormData()
  //     formData.append('file', image)

  //     // Make a POST request with Axios
  //     const response = await api.postForm('/products/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //     return response.data
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
  return {
    // upImage,
    list,
    update,
    post,
    remove
  }
}
