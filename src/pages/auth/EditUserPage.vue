<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      @cancel="onCancel"
      class="q-gutter-md"
    >
      <q-input v-model="data.email" type="text" label="Email" />
      <q-input v-model="data.first_name" type="text" label="First Name" />
      <q-input v-model="data.last_name" type="text" label="Last Name" />
      <q-checkbox v-model="data.is_active" label="Active" />
      <q-checkbox v-model="data.is_staff" label="Staff" />
      <q-checkbox v-model="data.is_superuser" label="Superuser" />
      <div>
        <q-btn icon="mdi-cancel" label="Cancelar" type="cancel" flat color="primary" />
        <q-btn icon="mdi-broom" label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
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
      email: computed(() => userStore.user.email),
      first_name: computed(() => userStore.user.first_name),
      last_name: computed(() => userStore.user.last_name),
      is_active: computed(() => userStore.user.is_active),
      is_staff: computed(() => userStore.user.is_staff),
      is_superuser: computed(() => userStore.user.is_superuser)
    })

    const onSubmit = async() => {
      const response = await userAPI.createUser(data.value)
      console.log(response)
      if (response) {
        router.push({ name: 'users' })
      }
    }

    const onReset = () => {
      data.value = {
        email: '',
        first_name: '',
        last_name: '',
        is_active: true,
        is_staff: false,
        is_superuser: false
      }
    }

    const onCancel = () => {
      router.push({ name: 'users' })
    }

    return {
      data,
      onSubmit,
      onReset,
      onCancel
    }
  }
})
</script>
