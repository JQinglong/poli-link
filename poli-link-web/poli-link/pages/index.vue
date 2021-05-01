<template>
    <v-card
      color="indigo lighten-4"
    >

    <v-data-table
      :items="councils"
      :search="search"
      hide-default-footer
      dense
    >
      <template v-slot:top>
        <v-toolbar
          dark
          dense
          color="blue-grey darken-4"
        >
          今話題の会議体
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
      <template v-slot:item="{ item }">
          <council-list-item :council="item" />
        
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import CouncilListItem from '~/components/council/CouncilListItem.vue';
type Item = {
  id: string
  title: string
  subtitle: string
  headline: string
  action: string
}

export default defineComponent({
  components: { CouncilListItem },
  setup() {
    const search = ref<String>('')

    const selected = ref<Number[]>([2])

    const councils = ref<Item[]>([
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
    }
  }
})
</script>
