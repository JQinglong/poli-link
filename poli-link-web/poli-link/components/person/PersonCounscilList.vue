<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="councils"
      hide-default-header
      hide-default-footer
      dense
    >

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          @click="$router.push(`/council/${item.id}/`)"
        >
          mdi-forum
        </v-icon>
      </template>
    </v-data-table>

  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import { CouncilType } from '~/types'

export default defineComponent({
  setup() {
    const headers = [
      {text: '名称', value: 'name'},
      {text: '', value: 'actions', sortable: false},
    ]

    const councils = ref<CouncilType[]>([
      {
        id: '1',
        name: 'オリンピック組織委員会',
        url: 'https://www.cas.go.jp/jp/seisaku/ful/yusikisyakaigi.html',
        description: '新型コロナウイルス感染症対策に関する事項（ワクチン接種に係る事項を含む。）。',
        ministry_id: '1',
      },
      {
        id: '2',
        name: '「スーパーシティ」構想の実現に向けた有識者懇談会',
        url: 'https://www.cas.go.jp/jp/seisaku/ful/yusikisyakaigi.html',
        description: '新型コロナウイルス感染症対策に関する事項（ワクチン接種に係る事項を含む。）。',
        ministry_id: '1',
      },
      {
        id: '3',
        name: '新型コロナウイルス感染症対策分科会',
        url: 'https://www.cas.go.jp/jp/seisaku/ful/yusikisyakaigi.html',
        description: '新型コロナウイルス感染症対策に関する事項（ワクチン接種に係る事項を含む。）。',
        ministry_id: '1',
      }
    ])


    return {
      headers,
      councils,
    }
  }
})
</script>
