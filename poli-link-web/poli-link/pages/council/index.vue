<template>
<div>
    <council-list-by-ministry />
</div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import CouncilListByMinistry from '~/components/council/CouncilListByMinistry.vue'

type Item = {
  id: string
  name: string
  name_e: string
  abbreviation: string
  url: string
}

export default defineComponent({
  components: { CouncilListByMinistry },
  setup() {
    const ministries = ref<Item[]>([
      {
        id: '1',
        name: '内閣府',
        name_e: 'Cabinet Office',
        abbreviation: 'CAO',
        url: 'https://www.cao.go.jp/'
      },
      {
        id: '2',
        name: '復興庁',
        name_e: 'Cabinet Office',
        abbreviation: 'CAO',
        url: 'https://www.cao.go.jp/'
      },
      {
        id: '3',
        name: '総務省',
        name_e: 'Cabinet Office',
        abbreviation: 'CAO',
        url: 'https://www.cao.go.jp/'
      },

    ])

    return {
      ministries
    }
  }
})
</script>
