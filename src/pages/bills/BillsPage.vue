<template>
  <q-page padding>
    <q-table
      grid
      grid-Headers
      flat
      bordered
      title="Contas"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useBills from 'src/composables/useBills'

export default defineComponent({
  name: 'BillsPage',
  setup() {
    const billsAPI = useBills()

    const columns = [
      {
        name: 'business',
        label: 'Empresa',
        field: row => row.business,
        align: 'left',
        sortable: true
      },
      {
        name: 'reference',
        label: 'Referência',
        field: 'reference',
        align: 'left',
        sortable: true
      },
      {
        name: 'value',
        label: 'Valor',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        name: 'febraban',
        label: 'Febraban',
        field: 'febraban',
        align: 'left',
        sortable: true
      },
      {
        name: 'qr_code',
        label: 'QR Code',
        field: 'qr_code',
        align: 'left',
        sortable: true
      },
      {
        name: 'description',
        label: 'Descrição',
        field: 'description',
        align: 'left',
        sortable: true
      },
      {
        name: 'due_date',
        label: 'Vencimento',
        field: 'due_date',
        align: 'left',
        sortable: true
      },
      {
        name: 'payment_date',
        label: 'Pagamento',
        field: 'payment_date',
        align: 'left',
        sortable: true
      },
      {
        name: 'is_paid',
        label: 'Pago',
        field: 'is_paid',
        align: 'left',
        sortable: true
      },
      {
        name: 'payment_method',
        label: 'Método de Pagamento',
        field: 'payment_method',
        align: 'left',
        sortable: true
      }
    ]

    const rows = ref([])

    onMounted(async () => {
      const response = await billsAPI.getBills()
      rows.value = response
    })

    return {
      rows,
      columns
    }
  }
})
</script>
