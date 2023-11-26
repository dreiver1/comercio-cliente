<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input v-model="data.email" type="text" label="Email" />
      <q-input v-model="data.password" type="password" label="Password" />
      <q-input v-model="data.first_name" type="text" label="First Name" />
      <q-input v-model="data.last_name" type="text" label="Last Name" />
      <q-checkbox v-model="data.is_active" label="Active" />
      <q-checkbox v-model="data.is_staff" label="Staff" />
      <q-checkbox v-model="data.is_superuser" label="Superuser" />
      <div>
        <q-btn icon="mdi-content-save-edit-outline" label="Submit" type="submit" color="primary"/>
        <q-btn icon="mdi-broom" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useUser from 'src/composables/useUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateUserPage',

  setup () {
    const userAPI = useUser()

    const router = useRouter()

    const data = ref({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      is_active: true,
      is_staff: false,
      is_superuser: false
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
        password: '',
        first_name: '',
        last_name: '',
        is_active: true,
        is_staff: false,
        is_superuser: false
      }
    }

    return {
      data,
      onSubmit,
      onReset
    }
  }
})
</script>
