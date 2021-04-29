<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="(item, i) in adminitems"
          :key="i"
          :to="item.to"
          router
          exact
          height="32px"
        >
          <v-list-item-action  class="my-1">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="teal darken-2"
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        :to="'/'"
      >
        <v-icon
          class="mx-4"
          large
        >
          mdi-account-group
        </v-icon>
      </v-btn>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Poli Link （絶賛開発中）</span>
      </v-toolbar-title> 

      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <!-- <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        /> -->
        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar
                v-if="stateGlobal.user"
                size="36"
              >
                <img :src="stateGlobal.user.photoURL" :alt="stateGlobal.user.displayName" />
              </v-avatar>
              <v-icon
                v-if="!stateGlobal.user"
              >mdi-account
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="stateGlobal.user"
              :to="'/settings'"
             >
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item :to="'/settings'">
              <v-list-item-avatar>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item :to="'/login'">
              <v-list-item-avatar>
                <v-icon>mdi-login</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-avatar>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} JQ</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { provideGlobalState, injectGlobalState } from '@/compositions/states/user'
import { auth } from '~/plugins/firebase.config'
import { SignOut } from '~/compositions/firebase/auth'

type Item = {
  icon: string
  title: string
  to: string
}

export default defineComponent({
  name: 'DefaultLayout',

  setup(props: any, { root }) {
    const clipped = ref(false)
    const drawer = ref(false)
    const fixed = ref(false)

    const items = ref<Item[]>([
      {
        icon: 'mdi-home',
        title: 'ホーム',
        to: '/'
      },
      {
        icon: 'mdi-apps',
        title: 'memo',
        to: '/memo'
      },
      {
        icon: 'mdi-forum',
        title: '会議体検索',
        to: '/council'
      },
      {
        icon: 'mdi-tooltip-account',
        title:'構成員検索',
        to: '/person'
      },
      {
        icon: 'mdi-apps',
        title: 'todolist',
        to: '/todolist'
      },
      {
        icon: 'mdi-bookmark',
        title: '後で見る',
        to: '/later'
      },
    ])
    const adminitems = ref<Item[]>([
      {
        icon: 'mdi-help',
        title: 'help',
        to: '/help'
      },
      // {
      //   icon: 'mdi-cogs',
      //   title: 'システム設定',
      //   to: '/system/'
      // },
    ])
    provideGlobalState()
    const stateGlobal = injectGlobalState()

    onMounted(() => {
      const publicPath = ["/signin","/signup"]
      if (stateGlobal.user.value.id === '') {
        auth.onAuthStateChanged((user) => {

          if (user) {
            stateGlobal.setUserState({
              id: user ? user.uid : '',
              email: user && user.email ? user.email : '',
              name: user && user.displayName ? user.displayName : '',
              thumbnail: user && user.photoURL ? user.photoURL : '',
            })
          } else {
            // root.$router.push('/signin')
          }
        })
      }
    })

    const signOut = () => {
      SignOut()

    }

    return {
      clipped,
      drawer,
      fixed,
      items,
      adminitems,
      stateGlobal,
      signOut,
    }
  },
})

</script>

<style scoped>
.v-list-item__action {
    margin-top: 4px; margin-bottom: 8px;
}

</style>