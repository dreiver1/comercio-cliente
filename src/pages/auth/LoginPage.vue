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
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const authAPI = useAuth()

    const authStore = useAuthStore()

    const router = useRouter()

    const data = ref({
      email: 'string',
      password: 'string'
    })

    const login = async() => {
      await authAPI.login(data.value)
      if (authStore.accessToken !== '' && authStore.accessToken != null) {
        router.push({ name: 'dashboard' })
      }
    }

    return {
      data,
      login
    }
  }
})
</script>
