<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input v-model="userStore.user.email" type="text" label="Email" />
      <q-input v-model="userStore.user.first_name" type="text" label="First Name" />
      <q-input v-model="userStore.user.last_name" type="text" label="Last Name" />
      <q-checkbox v-model="userStore.user.is_active" label="Active" />
      <q-checkbox v-model="userStore.user.is_staff" label="Staff" />
      <q-checkbox v-model="userStore.user.is_superuser" label="Superuser" />
      <div>
        <q-btn color="negative" flat icon="mdi-account-minus-outline" label="Delete" @click="onDelete" />
        <q-btn icon="mdi-cancel" label="Cancelar" @click="onCancel" flat color="primary" />
        <q-btn icon="mdi-content-save-edit-outline" label="Salvar" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import useUser from 'src/composables/useUser'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'

export default defineComponent({
  name: 'EditUserPage',

  setup () {
    const userAPI = useUser()

    const userStore = useUserStore()

    const router = useRouter()

    const data = ref({
      uuid: computed(() => userStore.user.uuid),
      email: computed(() => userStore.user.email),
      first_name: computed(() => userStore.user.first_name),
      last_name: computed(() => userStore.user.last_name),
      is_active: computed(() => userStore.user.is_active),
      is_staff: computed(() => userStore.user.is_staff),
      is_superuser: computed(() => userStore.user.is_superuser)
    })

    const onSubmit = async() => {
      const response = await userAPI.updateUser(data.value)
      console.log(response)
      if (response) {
        router.push({ name: 'users' })
      }
    }

    const onCancel = () => {
      router.push({ name: 'users' })
    }

    const onDelete = async(uuid) => {
      const response = await userAPI.deleteUser(data.value.uuid)
      if (response) {
        router.push({ name: 'users' })
      }
    }

    return {
      onDelete,
      userStore,
      data,
      onSubmit,
      onCancel
    }
  }
})
</script>
