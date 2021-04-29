<template>
<div>
  <v-card>
    あかさたな
    <v-data-table
      :headers="headers"
      :items="people"
      item-key="name"
      group-by="group"
      class="elevation-1"
      dense
    >

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        @click="$router.push(`/person/${item.id}/`)"
      >
        mdi-tooltip-account
      </v-icon>
    </template>

    </v-data-table>
  </v-card>
</div>
</template>

<script lang="ts">
// 構成員リスト
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import CouncilListItem from '~/components/council/CouncilListItem.vue';

type PersonItem = {
  id: string
  name: string
  subtitle: string
  headline: string
  group: string
}
export default defineComponent({
  setup() {
    const headers = [
      {text: '氏名', value: 'name'},
      {text: '行', value: 'group'},
      {text: '', value: 'actions', sortable: false},
    ]

    const people = ref<PersonItem[]>([
      {
        id: '1',
        group: 'あ',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        name: '尾身 茂',
      },
      {
        id: '2',
        group: 'あ',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        name: '磯部 哲',
      },
      {
        id: '3',
        group: 'た',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        name: '竹中 平蔵',
      }
    ])

    return {
      headers,
      people,
    }
  }
})
</script>
