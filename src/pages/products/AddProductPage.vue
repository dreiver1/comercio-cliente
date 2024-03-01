<!-- eslint-disable camelcase -->
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
            v-model="product.title"
            label="Nome do produto *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, digite o nome do produto']"
          />
          <q-select
            filled
            v-model="product.category_id"
            :options="category_id.map(categoria => categoria.name)"
            label="Categoria ID *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, digite a categoria ID']"
          />
          <q-input
            filled
            type="number"
            v-model="product.price"
            label="Preço *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'O campo Preço é obrigatório',
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="product.available_quantity"
            label="Quantidade disponível *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'O campo Quantidade disponível é obrigatório',
            ]"
          />
          <q-select
            filled
            v-model="product.buying_mode"
            :options="buyingModes"
            label="Modo de compra *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, selecione o modo de compra']"
          />
          <q-select
            filled
            v-model="product.condition"
            :options="conditions"
            label="Condição do produto *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, selecione a condição do produto']"
          />
          <q-select
            :options="listingTypes.map(type => type.id)"
            filled
            v-model="product.listing_type_id"
            label="ID do tipo de listagem *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, digite o ID do tipo de listagem']"
          />
          <q-select
            :options="warranty.map(element => element.name)"
            filled
            v-model="product.warranty_type"
            label="Tipo de garantia"
          />
          <q-input
            filled
            type="number"
            v-model="product.warranty_time"
            label="Tempo de garantia (dias)"
          />
          <q-input
            filled
            v-model="product.brand"
            label="Marca"
          />
          <q-input
            filled
            v-model="product.ean"
            label="EAN"
          />
          <q-input
            filled
            v-model="product.model"
            label="Modelo"
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
import { useProductsStore } from 'src/stores/ProductsStore'
export default defineComponent({
  name: 'IndexPage',
  setup () {
    const product = useProductsStore()
    const route = useRouter()
    const api = useAPI('item')
    const image = ref(null) // não pode ser string, pois o componente q-file espera um array
    const buyingModes = ['buy_it_now', 'auction']
    const conditions = ['new', 'used']
    // eslint-disable-next-line camelcase
    const listingTypes = [
      {
        site_id: 'MLB',
        id: 'gold_pro',
        name: 'Premium'
      },
      {
        site_id: 'MLB',
        id: 'gold_premium',
        name: 'Oro Premium'
      },
      {
        site_id: 'MLB',
        id: 'gold_special',
        name: 'Clásica'
      },
      {
        site_id: 'MLB',
        id: 'gold',
        name: 'Oro'
      },
      {
        site_id: 'MLB',
        id: 'silver',
        name: 'Plata'
      },
      {
        site_id: 'MLB',
        id: 'bronze',
        name: 'Bronce'
      },
      {
        site_id: 'MLB',
        id: 'free',
        name: 'Gratuita'
      }
    ]

    // eslint-disable-next-line camelcase
    const category_id = [
      {
        id: 'MLB5672',
        name: 'Acessórios para Veículos'
      },
      {
        id: 'MLB271599',
        name: 'Agro'
      },
      {
        id: 'MLB1403',
        name: 'Alimentos e Bebidas'
      },
      {
        id: 'MLB1071',
        name: 'Animais'
      },
      {
        id: 'MLB1367',
        name: 'Antiguidades e Coleções'
      },
      {
        id: 'MLB1368',
        name: 'Arte, Papelaria e Armarinho'
      },
      {
        id: 'MLB1384',
        name: 'Bebês'
      },
      {
        id: 'MLB1246',
        name: 'Beleza e Cuidado Pessoal'
      },
      {
        id: 'MLB1132',
        name: 'Brinquedos e Hobbies'
      },
      {
        id: 'MLB1430',
        name: 'Calçados, Roupas e Bolsas'
      },
      {
        id: 'MLB1039',
        name: 'Câmeras e Acessórios'
      },
      {
        id: 'MLB1743',
        name: 'Carros, Motos e Outros'
      },
      {
        id: 'MLB1574',
        name: 'Casa, Móveis e Decoração'
      },
      {
        id: 'MLB1051',
        name: 'Celulares e Telefones'
      },
      {
        id: 'MLB1500',
        name: 'Construção'
      },
      {
        id: 'MLB5726',
        name: 'Eletrodomésticos'
      },
      {
        id: 'MLB1000',
        name: 'Eletrônicos, Áudio e Vídeo'
      },
      {
        id: 'MLB1276',
        name: 'Esportes e Fitness'
      },
      {
        id: 'MLB263532',
        name: 'Ferramentas'
      },
      {
        id: 'MLB12404',
        name: 'Festas e Lembrancinhas'
      },
      {
        id: 'MLB1144',
        name: 'Games'
      },
      {
        id: 'MLB1459',
        name: 'Imóveis'
      },
      {
        id: 'MLB1499',
        name: 'Indústria e Comércio'
      },
      {
        id: 'MLB1648',
        name: 'Informática'
      },
      {
        id: 'MLB218519',
        name: 'Ingressos'
      },
      {
        id: 'MLB1182',
        name: 'Instrumentos Musicais'
      },
      {
        id: 'MLB3937',
        name: 'Joias e Relógios'
      },
      {
        id: 'MLB1196',
        name: 'Livros, Revistas e Comics'
      },
      {
        id: 'MLB1168',
        name: 'Música, Filmes e Seriados'
      },
      {
        id: 'MLB264586',
        name: 'Saúde'
      },
      {
        id: 'MLB1540',
        name: 'Serviços'
      },
      {
        id: 'MLB1953',
        name: 'Mais Categorias'
      }
    ]

    const warranty = [
      {
        id: '2230280',
        name: 'Garantia do vendedor'
      },
      {
        id: '2230279',
        name: 'Garantia de fábrica'
      }
    ]

    const generateEAN = () => {
    // Gerar os primeiros 12 dígitos aleatórios
      let eanPartial = ''
      for (let i = 0; i < 12; i++) {
        eanPartial += Math.floor(Math.random() * 10)
      }

      // Calcular o dígito de verificação
      let total = 0
      for (let i = 0; i < 12; i++) {
        total += parseInt(eanPartial[i]) * (i % 2 === 0 ? 1 : 3)
      }
      const checkDigit = (10 - (total % 10)) % 10

      // Combinar os dígitos parciais e o dígito de verificação
      const ean = eanPartial + checkDigit

      return ean
    }

    return {
      // eslint-disable-next-line camelcase
      category_id,
      image,
      listingTypes,
      conditions,
      buyingModes,
      product,
      warranty,
      async onSubmit () {
        // eslint-disable-next-line no-unused-vars
        const EAN = generateEAN()
        // eslint-disable-next-line no-unused-vars
        let idCategory = ''
        let idWanrranty = ''
        // eslint-disable-next-line camelcase
        category_id.forEach(element => {
          if (element.name === product.category_id) {
            idCategory = element.id
          }
        })
        warranty.forEach(element => {
          if (element.name === product.warranty_type) {
            idWanrranty = element.id
          }
        })
        try {
          const data = {
            title: product.title,
            category_id: 'MLB3530',
            price: product.price,
            site_id: 'MLB',
            currency_id: 'BRL',
            available_quantity: parseInt(product.available_quantity),
            buying_mode: product.buying_mode,
            condition: product.condition,
            listing_type_id: product.listing_type_id,
            sale_terms: [
              {
                id: 'WARRANTY_TYPE',
                value_id: idWanrranty
              },
              {
                id: 'WARRANTY_TIME',
                value_name: product.warranty_time + 'días'
              }
            ],
            pictures: product.pictures,
            attributes: [
              {
                id: 'BRAND',
                value_name: product.brand
              },
              {
                id: 'EAN',
                value_name: '7890240110002'
              },
              {
                id: 'MODEL',
                value_name: product.model
              }
            ],
            shipping: {
              local_pick_up: false,
              mode: 'me2',
              dimensions: '10x10x20,700'
            }
          }
          console.log(data)
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
          console.log(image.value)
          const response = await api.upImage(image.value)
          const data = {
            source: 'http://localhost:8080/files/' + response
          }
          product.pictures.pop()
          product.pictures.push(data)
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
