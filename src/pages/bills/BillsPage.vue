<template>
  <q-page padding>
    <div class="row items-center justify-end">
      <q-btn flat icon="mdi-file-import-outline" />
      <q-btn flat icon="mdi-file-export-outline" />
      <q-btn flat :icon="grid ? 'mdi-view-headline' : 'mdi-view-grid-outline'" @click="grid = !grid" />
    </div>
    <q-table
      :grid="grid"
      grid-Headers
      flat
      bordered
      title="Contas"
      :rows="rows"
      :columns="columns"
    >
      <template v-slot:top-right>
        <q-avatar size="xl" font-size="2.5rem" icon="mdi-plus" @click="billStore.billDialog = true" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td key="business" :props="props">
            {{ props.row.business }}
          </q-td>

          <q-td key="reference" :props="props">
            {{ props.row.reference }}
          </q-td>

          <q-td key="value" :props="props">
            R$ {{ props.row.value }}
          </q-td>

          <q-td key="febraban" :props="props" >
            <div @click="showQRCode = !showQRCode, febraban = props.row.febraban">
              {{ props.row.febraban }}
              <q-icon v-if="props.row.febraban" size="md" name="mdi-qrcode" />
              <q-dialog v-model="showQRCode">
                <q-img
                :src="qrcode.value"
              />
              </q-dialog>
            </div>
          </q-td>

          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>

          <q-td key="due_date" :props="props">
            <div v-if="props.row.payment_date">
              {{ formatDate(props.row.due_date) }}
              <q-icon size="md" color="green" name="mdi-calendar-check-outline" />
            </div>
            <div v-else-if="props.row.due_date < dateNow">
              {{ formatDate(props.row.due_date) }}
              <q-icon size="md" name="mdi-calendar-alert-outlin" />
            </div>
            <div v-else-if="props.row.due_date >= dateNow">
              {{ formatDate(props.row.due_date) }}
              <q-icon size="md" color="yellow" name="mdi-calendar-alert-outline" />
            </div>
          </q-td>

          <q-td key="payment_method" :props="props">
            {{ props.row.payment_method }}
          </q-td>

          <q-td key="payment_date" :props="props">
            <div v-if="props.row.payment_date" style="color: green;">
              {{ formatDate(props.row.payment_date) }}
            </div>
            <div v-else class="row justify-center">
              <q-icon color="red" size="md" name="mdi-alert" />
            </div>
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn size="1.2em" text-color="primary" dense flat icon="mdi-pencil-outline" @click="handleEdit(props.row)" />
            <q-btn size="1.2em" text-color="negative" dense flat icon="mdi-delete-outline" @click="handleDelete(props.row.uuid)" />
          </q-td>

        </q-tr>
      </template>
    </q-table>
    <BillsCreate />
    <BillEdit />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import useBills from 'src/composables/useBills'
import BillsCreate from 'src/components/bills/BillsCreate.vue'
import BillEdit from 'src/components/bills/BillEdit.vue'
import { useBillStore } from 'src/stores/billsStore'
import { date } from 'quasar'
import qrCode from 'src/composables/qrCodeGenerator'
import dateFormatedBR from 'src/composables/formatDate'

export default defineComponent({
  name: 'BillsPage',
  components: {
    BillsCreate,
    BillEdit
  },
  setup() {
    const billAPI = useBills()

    const billStore = useBillStore()

    const grid = ref(false)

    const columns = [
      {
        name: 'business',
        label: 'Empresa',
        field: row => row.business,
        align: 'left',
        sortable: true
      },
      { name: 'reference', label: 'Referência', field: 'reference', align: 'left', sortable: true },
      { name: 'value', label: 'Valor', field: 'value', align: 'left', sortable: true },
      { name: 'febraban', label: 'Febraban', field: 'febraban', align: 'left', sortable: true },
      { name: 'description', label: 'Descrição', field: 'description', align: 'left', sortable: true },
      { name: 'due_date', label: 'Vencimento', field: 'due_date', align: 'left', sortable: true },
      { name: 'payment_method', label: 'Método de Pagamento', field: 'payment_method', align: 'left', sortable: true },
      { name: 'payment_date', label: 'Data de Pagamento', field: 'payment_date', align: 'left', sortable: true },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'left', sortable: true }
    ]

    const rows = ref(computed(() => billStore.billList))

    const dateNow = date.formatDate(Date(), 'YYYY-MM-DD')

    const febraban = ref('')

    const qrcode = computed(() => {
      return qrCode(febraban)
    })

    const showQRCode = ref(false)

    onMounted(async () => {
      const response = await billAPI.getBills()
      billStore.billList = response
    })

    const handleDelete = async (uuid) => {
      await billAPI.deleteBill(uuid)
      const response = await billAPI.getBills()
      billStore.billList = response
    }

    const formatDate = (date) => {
      return dateFormatedBR(date)
    }

    const handleEdit = (row) => {
      billStore.billEdit = row
      billStore.billEditDialog = true
    }

    return {
      grid,
      rows,
      qrcode,
      dateNow,
      columns,
      febraban,
      billStore,
      showQRCode,
      handleEdit,
      formatDate,
      handleDelete
    }
  }
})
</script>
