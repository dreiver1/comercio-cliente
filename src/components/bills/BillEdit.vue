<template>
  <q-dialog v-model="billStore.billEditDialog" persistent>
    <q-card style="min-width: 50%;">
      <q-card-section class="col items-center q-gutter-lg">
        <q-input style="width: 30%;" flat dense filled disable v-model="billStore.billEdit.uuid" />
        <div class="row q-gutter-md">
          <q-input filled style="width: 60%;" v-model="billStore.billEdit.reference" type="text" label="Referência" />
          <q-input filled v-model="billStore.billEdit.value" label="Valor" mask="#.##" reverse-fill-mask input-class="text-right" />
          <q-space />
          <div v-if="billStore.billEdit.is_paid == false">
            <q-icon v-if ="billStore.billEdit.due_date == ''" size="4rem" color="white" name="mdi-calendar-alert-outline" />
            <q-icon v-else-if="dateNow < billStore.billEdit.due_date" size="4rem" color="yellow" name="mdi-calendar-alert-outline" />
            <q-icon v-else-if="dateNow >= billStore.billEdit.due_date" size="4rem" color="red" name="mdi-calendar-alert-outline" />
          </div>
          <div v-else>
            <q-icon size="4rem" color="green" name="mdi-calendar-check-outline" />
          </div>
        </div>
        <div class="row q-gutter-md">
          <q-input filled style="width: 48%;" v-model="billStore.billEdit.business" type="text" label="Empresa" />
          <!-- CALENDAR DUE DATE -->
          <q-input filled style="width: 35%;" v-model="billStore.billEdit.due_date" label="Data de vencimento" >
            <template v-slot:append>
              <q-icon name="mdi-calendar-month-outline" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="billStore.billEdit.due_date"
                  landscape
                  minimal
                >
                <div class="row">
                  {{ date.formatDate(billStore.billEdit.due_date, 'DD/MM/YYYY') }}
                  <q-space />
                  <q-btn v-close-popup no-caps label="Fechar" color="primary" flat />
                </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
        </div>
        <div class="q-gutter-md">
          <q-input filled v-model="billStore.billEdit.febraban" type="text" label="Febraban">
            <template v-slot:append>
              <q-btn flat dense icon="mdi-qrcode" @click="showQRCode = true" />
            </template>
          </q-input>
          <q-input filled class="col-5" v-model="billStore.billEdit.description" type="text" label="Descrição" />
        </div>
        <q-dialog v-model="showQRCode">
          <q-img :src="qrcode.value" />
        </q-dialog>
        <div class="row q-gutter-md">
          <q-input filled style="width: 35%;" v-model="billStore.billEdit.payment_date" label="Data de Pagamento" >
            <template v-slot:append>
              <q-icon name="mdi-calendar-month-outline" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="billStore.billEdit.payment_date"
                  landscape
                  minimal
                >
                <div class="row">
                  {{ billStore.billEdit.payment_date }}
                  <q-space />
                  <q-btn v-close-popup no-caps label="Fechar" color="primary" flat />
                </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input filled style="width: 40%;" v-model="billStore.billEdit.payment_method" type="text" label="Método de Pagamento" />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="mdi-cancel" label="Cancel" color="primary" v-close-popup />
        <q-btn flat icon="mdi-content-save-edit-outline" label="Salvar" color="primary" v-close-popup @click="handleUpdateBill" />
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

    const data = billStore.billEdit

    console.log(data)

    const showQRCode = ref(false)

    const dateNow = date.formatDate(Date(), 'YYYY-MM-DD')

    const qrcode = computed(() => {
      return qrCode(billStore.billEdit.febraban)
    })

    const handleUpdateBill = async () => {
      billStore.billEdit.payment_date = date.formatDate(billStore.billEdit.payment_date, 'YYYY-MM-DD')
      billStore.billEdit.due_date = date.formatDate(billStore.billEdit.due_date, 'YYYY-MM-DD')
      await billAPI.updateBill(billStore.billEdit)
      const response = await billAPI.getBills()
      billStore.billList = response
    }

    return {
      data,
      date,
      qrcode,
      dateNow,
      billStore,
      showQRCode,
      handleUpdateBill
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
