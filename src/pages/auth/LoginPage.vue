<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 25%;">
      <q-card-section>
        <q-input v-model="data.email" type="text" label="Email" />
        <q-input v-model="data.password" type="password" label="Password" />
      </q-card-section>
      <q-card-actions vertical align="right">
        <q-btn style="min-width: 25%;" label="Login" @click="login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from 'src/composables/useAuth'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const authAPI = useAuth()

    const data = ref({
      email: 'string',
      password: 'string'
    })

    const login = async() => {
      await authAPI.login(data.value)
    }

    return {
      data,
      login
    }
  }
})
</script>
