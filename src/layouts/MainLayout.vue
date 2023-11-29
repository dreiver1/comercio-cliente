<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          pi2comercio
        </q-toolbar-title>

        <div>
          <q-toggle color="red" :icon="$q.dark.isActive ? 'mdi-lightbulb-off' : 'mdi-lightbulb-on'" v-model="isDark" @update:model-value="darkMode(isDark)" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Dashboard',
    caption: '',
    icon: 'mdi-monitor-dashboard',
    link: '/dashboard'
  },
  {
    title: 'PDV',
    caption: '',
    icon: 'mdi-point-of-sale',
    link: '/pdv'
  },
  {
    title: 'Categorias',
    caption: '',
    icon: 'mdi-format-list-group-plus',
    link: '/categories'
  },
  {
    title: 'Produtos',
    caption: '',
    icon: 'mdi-tag-heart-outline',
    link: '/products'
  },
  {
    title: 'Usuários',
    caption: '',
    icon: 'mdi-account-heart-outline',
    link: '/users'
  },
  {
    title: 'Fornecedores',
    caption: '',
    icon: 'mdi-factory',
    link: '/suppliers'
  },
  {
    title: 'Configurações',
    caption: '',
    icon: 'mdi-cog-outline',
    link: '/settings'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)

    const isDark = $q.dark.isActive

    const darkMode = async (mode) => {
      $q.dark.set(mode)
    }

    return {
      isDark,
      darkMode,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
