<template>
<div>
  <v-card>
    <v-text-field
      v-model="search"
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
    ></v-text-field>
    <v-tabs
      dark
      background-color="blue-grey darken-4"
      show-arrows
    >
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

      <v-tab v-for="ministriy in ministries" :key="ministriy.name">
        {{ ministriy.name }}
      </v-tab>
    </v-tabs>
    <v-data-table
      :items="councils"
      :search="search"
      hide-default-footer
      dense
    >
      <template v-slot:top>
        <v-toolbar
        >
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                depressed
                color="teal"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                depressed
                color="teal"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      
      </template>
      <template v-slot:item="{ item }">
          <council-list-item />
        
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import CouncilListItem from '~/components/council/CouncilListItem.vue';

type MinistryItem = {
  id: string
  name: string
  name_e: string
  abbreviation: string
  url: string
}

type CounsilItem = {
  id: string
  title: string
  subtitle: string
  headline: string
  action: string
}
export default defineComponent({
  setup() {
    const search = ref<String>('')

    const selected = ref<Number[]>([2])

    const councils = ref<CounsilItem[]>([
      {
        id: '1',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: 'オリンピック組織委員会',
      },
      {
        id: '2',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: '「スーパーシティ」構想の実現に向けた有識者懇談会',
      },
      {
        id: '3',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: '新型コロナウイルス感染症対策分科会',
      }
    ])

    const ministries = ref<MinistryItem[]>([
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
      search,
      selected,
      councils,
      ministries
    }
  }
})
</script>
