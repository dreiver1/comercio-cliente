<template>
  <q-dialog v-model="billStore.billDialog" persistent>
    <q-card style="min-width: 50%;">
      <q-card-section class="col items-center q-gutter-lg">
        <div class="row q-gutter-md">
          <q-input filled style="width: 60%;" v-model="data.reference" type="text" label="Referência" />
          <q-input filled v-model="data.value" label="Valor" mask="#.##" reverse-fill-mask input-class="text-right" />
          <q-space />
          <div v-if="data.is_paid == false">
            <q-icon v-if ="data.due_date == ''" size="4rem" color="white" name="mdi-calendar-alert-outline" />
            <q-icon v-else-if="dateNow < data.due_date" size="4rem" color="yellow" name="mdi-calendar-alert-outline" />
            <q-icon v-else-if="dateNow >= data.due_date" size="4rem" color="red" name="mdi-calendar-alert-outline" />
          </div>
          <div v-else>
            <q-icon size="4rem" color="green" name="mdi-calendar-check-outline" />
          </div>
        </div>
        <div class="row q-gutter-md">
          <q-input filled style="width: 48%;" v-model="data.business" type="text" label="Empresa" />
          <!-- CALENDAR DUE DATE -->
          <q-input filled style="width: 35%;" v-model="data.due_date" mask="####-##-##" label="Data de vencimento" >
            <template v-slot:append>
              <q-icon name="mdi-calendar-month-outline" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="data.due_date"
                  landscape
                  minimal
                >
                <div class="row">
                  {{ data.due_date }}
                  <q-space />
                  <q-btn v-close-popup no-caps label="Fechar" color="primary" flat />
                </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md">
          <q-input filled v-model="data.febraban" type="text" label="Febraban">
            <template v-slot:append>
              <q-btn flat dense icon="mdi-qrcode" @click="showQRCode = true" />
            </template>
          </q-input>
          <q-input filled class="col-5" v-model="data.description" type="text" label="Descrição" />
        </div>
        <q-dialog v-model="showQRCode">
          <q-img :src="qrcode.value" />
        </q-dialog>
        <div class="row q-gutter-md">
          <q-input filled style="width: 35%;" v-model="data.payment_date" label="Data de Pagamento" >
            <template v-slot:append>
              <q-icon name="mdi-calendar-month-outline" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="data.payment_date"
                  landscape
                  minimal
                >
                <div class="row">
                  {{ data.payment_date }}
                  <q-space />
                  <q-btn v-close-popup no-caps label="Fechar" color="primary" flat />
                </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input filled style="width: 40%;" v-model="data.payment_method" type="text" label="Método de Pagamento" />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="mdi-cancel" label="Cancel" color="primary" v-close-popup @click="clearData" />
        <q-btn flat icon="mdi-content-save-edit-outline" label="Salvar" color="primary" v-close-popup @click="handleCreateBill" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useBillStore } from 'src/stores/billsStore'
import useBills from 'src/composables/useBills'
import { date } from 'quasar'
import qrCode from 'src/composables/qrCodeGenerator'

export default defineComponent({
  name: 'BillsCreate',
  setup() {
    const billStore = useBillStore()

    const billAPI = useBills()

    const data = billStore.billCreate

    const form = ref(null)

    const showQRCode = ref(false)

    const dateNow = date.formatDate(Date(), 'YYYY-MM-DD')

    const qrcode = computed(() => {
      return qrCode(billStore.billCreate.febraban)
    })

    const clearData = () => {
      billStore.billCreate = {
        business: '',
        reference: '',
        value: null,
        febraban: '',
        is_paid: false,
        description: '',
        due_date: dateNow,
        payment_date: null,
        payment_method: ''
      }
    }

    const handleCreateBill = async () => {
      await billAPI.createBill(billStore.billCreate)
      const response = await billAPI.getBills()
      billStore.billList = response
      await clearData()
    }

    return {
      data,
      form,
      qrcode,
      dateNow,
      billStore,
      showQRCode,
      clearData,
      handleCreateBill
    }
  }
})
</script>

<style>
/* Personaliza a barra de rolagem (a alça de rolagem) */
::-webkit-scrollbar {
    width: 12px; /* Largura da barra de rolagem */
    height: 12px; /* Altura da barra de rolagem (para rolagem horizontal) */
}

/* Personaliza o rastro da barra de rolagem (onde a alça se move) */
::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor de fundo */
    border-radius: 6px; /* Bordas arredondadas */
}

/* Personaliza a alça da barra de rolagem */
::-webkit-scrollbar-thumb {
    background: #888; /* Cor da alça */
    border-radius: 6px; /* Bordas arredondadas */
}

/* Altera a cor da alça ao passar o mouse ou ao clicar */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgb(255, 255, 255) rgb(54, 54, 53); /* alça e trilha */
}
</style>
