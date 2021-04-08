import { Repositories } from '@/plugins/repository'

// poli-link-web/poli-link/nuxt.config.ts でやっている
declare module 'vue/types/vue' {
  interface Vue {
    readonly $Repositories: Repositories
  }
}

declare module 'vuex' {
  interface Store<S> {
    readonly $Repositories: Repositories
  }
}