<template>
<div>
  <v-card dense>
    <v-text-field
      v-model="search"
      clearable
      flat
      dense
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
      <v-tab v-for="ministry in ministryList" :key="ministry.name">
        {{ ministry.name }}
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
        dense
        flat
        >
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            clearable
            flat
            dense
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
              dense
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
              small
            >
              <v-btn
                depressed
                small
                color="teal"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                depressed
                small
                color="teal"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      
      </template>
      <template v-slot:item>
          <council-list-item />
        
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  useFetch,
  defineComponent,
} from '@nuxtjs/composition-api'
import CouncilListItem from '~/components/council/CouncilListItem.vue';
import { useMinistry } from "@/compositions";


type CounsilItem = {
  id: string
  title: string
  subtitle: string
  headline: string
  action: string
}
export default defineComponent({
  name: 'CouncilListByMinistry',
  setup() {
    const search = ref<String>('')
    const selected = ref<Number[]>([2])

    const {
      state: ministryState,
      getMinistryList,
    } = useMinistry()

    const fetchData = async (offset = 0) => {
      await getMinistryList({ offset })
      // console.log('ministryState', ministryState)
    }

    const { fetchState } = useFetch(() => fetchData())

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

    return {
      search,
      selected,
      councils,
      ...toRefs(ministryState),
      fetchState,
    }
  }
})
</script>
