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
        :src="product.pictures ? `${product.pictures[0].source}` : `http://localhost:8080/files/1709230306766_27562_EES-Still.jpg`"
        :ratio="16/9"
        spinner-color="primary"
        spinner-size="82px"
        style="width: 20em;"
      />
      <q-img
        v-else
        :src="product.pictures ? `${product.pictures[0].source}` : `http://localhost:8080/files/1709230306766_27562_EES-Still.jpg`"
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
        v-model="product.title"
        label="Nome do produto *"
        lazy-rules
        :rules="[ val => val && val.length > 3 || 'Por favor digite o nome do produto']"
      />

      <q-input
        filled
        v-model="product.description"
        label="Descrição"
      />

      <q-input
        filled
        type="number"
        v-model="product.price"
        label="Preço *"
        lazy-rules
        :rules="[
          val => val !== null && val !== 0.00 || 'Obrigatorio*',
        ]"
      />

      <q-input
        filled
        type="number"
        v-model="product.available_quantity"
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
import { defineComponent, ref } from 'vue'
import useAPI from 'src/composables/useAPI'
import { useRouter } from 'vue-router'
import { useProductsStore } from 'src/stores/ProductsStore'

export default defineComponent({
  name: 'PutProduct',
  setup () {
    const product = useProductsStore()
    const route = useRouter()
    const api = useAPI('item')
    const Id = product.id
    const newImg = ref(null)
    const deleteProduct = async () => {
      try {
        await api.remove(Id, product.condition)
        route.push('/products')
      } catch (error) {
        throw new Error(error)
      }
    }
    const updateImage = async () => {
      try {
        const response = await api.upImage(newImg.value)
        product.img.value = response
      } catch (error) {
        throw new Error(error)
      }
    }
    return {
      updateImage,
      product,
      newImg,
      Id,
      async onSubmit () {
        try {
          const data = {
            id: Id,
            name: product.name.value,
            description: product.description.value,
            price: product.price.value,
            quantity: product.quantity.value,
            img: product.img.value
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
