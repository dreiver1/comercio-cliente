<template>
  <q-page class="row justify-center aling-center itens-center">
    <div class="col-12 row justify-center">
      <div class="text-h3">Adicionar Produto</div>
    </div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-6"
    >
    <div class="row q-gutter-md">
      <q-img
        v-if="newImg === null"
        :src="img"
        :ratio="16/9"
        spinner-color="primary"
        spinner-size="82px"
        style="width: 20em;"
      />
      <q-img
        v-else
        :src="`http://localhost:8000/${img}`"
        :ratio="16/9"
        spinner-color="primary"
        spinner-size="82px"
        style="width: 20em;"
      />

      <q-file
        filled
        v-model="newImg"
        label="Trocar Imagem"
        accept="image/*"
        style="width: 10em;"
        @update:model-value="updateImage"
      />
    </div>

      <q-input
        filled
        v-model="name"
        label="Nome do produto *"
        lazy-rules
        :rules="[ val => val && val.length > 3 || 'Por favor digite o nome do produto']"
      />

      <q-input
        filled
        v-model="description"
        label="Descrição"
      />

      <q-input
        filled
        type="number"
        v-model="price"
        label="Preço *"
        lazy-rules
        :rules="[
          val => val !== null && val !== 0.00 || 'Obrigatorio*',
        ]"
      />

      <q-input
        filled
        type="number"
        v-model="quantity"
        label="Quantidade *"
        lazy-rules
        :rules="[
          val => val !== null && val !== 0.00 || 'Obrigatorio*',
        ]"
      />

      <div class="row space-around">
        <q-btn label="Conluir" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Excluir" color="red" text-color="white" @click="deleteProduct()"/>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAPI from 'src/composables/useAPI'
import { useRouter } from 'vue-router'
import { useProductsStore } from 'src/stores/ProductsStore'

export default defineComponent({
  name: 'PutProduct',
  setup () {
    const product = useProductsStore()
    const route = useRouter()
    const api = useAPI('products')
    const name = ref('')
    const description = ref('')
    const price = ref(0.00)
    const quantity = ref(0.00)
    const Id = product.id
    const img = ref('')
    const newImg = ref(null)
    onMounted(() => {
      name.value = product.name
      description.value = product.description
      price.value = product.price
      quantity.value = product.quantity
      img.value = product.img
    })
    const deleteProduct = async () => {
      try {
        await api.remove(Id)
        route.push('/products')
      } catch (error) {
        throw new Error(error)
      }
    }
    const updateImage = async () => {
      try {
        const response = await api.upImage(newImg.value)
        img.value = response
      } catch (error) {
        throw new Error(error)
      }
    }
    return {
      updateImage,
      name,
      description,
      price,
      quantity,
      img,
      newImg,
      Id,
      async onSubmit () {
        try {
          const data = {
            id: Id,
            name: name.value,
            description: description.value,
            price: price.value,
            quantity: quantity.value,
            img: img.value
          }
          await api.update(data)
          route.push('/products')
        } catch (error) {
          throw new Error(error)
        }
      },
      onReset () {
        try {
          route.push('/products')
        } catch (error) {
          throw new Error(error)
        }
      },
      deleteProduct
    }
  }
})
</script>
<style>

.page{
display: flex;
flex-direction: row;
width: fit-content;
}

@media screen and (max-whidth: 768px){
.page{
  flex-direction: column;
}
}

</style>
