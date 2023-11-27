<template>
  <q-page class="flex flex-center">
    <div class="col q-gutter-md">
      <div class="row q-gutter-md">
        <q-space />
        <q-btn color="primary" icon="mdi-file-import-outline" />
        <q-btn color="primary" icon="mdi-file-export-outline" />
        <q-btn color="primary" icon="mdi-plus" @click="createUser" />
      </div>
      <div>
        <q-table
          title="Usuários"
          style="height: 40em;"
          :rows="users"
          :columns="columns"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr @click="onEdit(props.row)">
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="first_name" :props="props">
                {{ props.row.first_name }}
              </q-td>
              <q-td key="last_name" :props="props">
                {{ props.row.last_name }}
              </q-td>
              <q-td key="is_active" :props="props">
                <q-icon v-if="props.row.is_active" name="mdi-circle" color="green" />
                <q-icon v-else name="mdi-circle" color="red" />
              </q-td>
              <q-td key="is_staff" :props="props">
                <q-icon v-if="props.row.is_staff" name="mdi-circle" color="green" />
                <q-icon v-else name="mdi-circle" color="red" />
              </q-td>
              <q-td key="is_superuser" :props="props">
                <q-icon v-if="props.row.is_superuser" name="mdi-circle" color="green" />
                <q-icon v-else name="mdi-circle" color="red" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useUser from 'src/composables/useUser'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/authStore'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const userAPI = useUser()

    const router = useRouter()

    const authStore = useAuthStore()

    const users = ref([])

    const columns = [
      {
        name: 'email',
        required: true,
        label: 'E-mail',
        align: 'email',
        field: row => row.email,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'first_name', align: 'left', label: 'Nome', field: 'first_name', sortable: true },
      { name: 'last_name', align: 'left', label: 'Sobrenome', field: 'last_name', sortable: true },
      { name: 'is_active', align: 'left', label: 'Active', field: 'is_active', sortable: true },
      { name: 'is_staff', align: 'left', label: 'Staff', field: 'is_staff', sortable: true },
      { name: 'is_superuser', align: 'left', label: 'Superuser', field: 'is_superuser', sortable: true }
    ]

    const listUsers = async() => {
      users.value = await userAPI.getUsers()
    }

    onMounted(async () => {
      await listUsers()
    })

    const createUser = async() => {
      router.push({ name: 'createUser' })
    }

    const onEdit = async(user) => {
      authStore.user = user
      router.push({ name: 'editUser' })
    }

    // const pagination = ref({
    //   sortBy: 'email',
    //   descending: false,
    //   page: 1,
    //   rowsPerPage: 10
    // })

    const pagination = ref({
      rowsPerPage: 0
    })

    return {
      pagination,
      users,
      createUser,
      listUsers,
      columns,
      onEdit
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
