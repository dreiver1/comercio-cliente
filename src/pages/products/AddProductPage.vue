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
        <q-input
          filled
          v-model="name"
          label="Nome do produto *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o nome do produto']"
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
            val => val !== null && val !== '' || 'Obrigatorio*',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model="quantity"
          label="Quantidade *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Obrigatorio*',
          ]"
        />

        <q-file
          filled
          v-model="image"
          label="Imagem *"
          @update:model-value="updateImage"
        />

        <div>
          <q-btn label="Concluir" type="submit" color="primary"/>
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-page>
  </template>
<script>
import { defineComponent, ref } from 'vue'
import useAPI from 'src/composables/useAPI'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'IndexPage',
  setup () {
    const route = useRouter()
    const api = useAPI('products')
    const name = ref('')
    const description = ref('')
    const price = ref('')
    const quantity = ref('')
    const img = ref('')
    const image = ref([]) // não pode ser string, pois o componente q-file espera um array
    return {
      name,
      price,
      image,
      quantity,
      description,
      img,
      async onSubmit () {
        try {
          const data = {
            name: name.value,
            description: description.value,
            price: price.value,
            quantity: quantity.value,
            img: img.value
          }
          await api.post(data)
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
      async updateImage () {
        try {
          const response = await api.upImage(image.value)
          img.value = response
        } catch (error) {
          throw new Error(error)
        }
      }
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
