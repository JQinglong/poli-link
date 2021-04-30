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
      <v-tabs dark background-color="blue-grey darken-4" show-arrows>
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab v-for="ministry in ministryList" :key="ministry.name">
          {{ ministry.name }}
        </v-tab>
      </v-tabs>
      <v-data-table :items="councilList" :search="search" hide-default-footer dense>
        <template v-slot:top>
          <v-toolbar dense flat>
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
              <v-btn-toggle v-model="sortDesc" mandatory small>
                <v-btn depressed small color="teal" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn depressed small color="teal" :value="true">
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
  </div>
</template>

<script lang="ts">
import { ref, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
import CouncilListItem from '~/components/council/CouncilListItem.vue';
import { useMinistry, useCouncil } from '@/compositions';

// type CounsilItem = {
//   id: string
//   title: string
//   subtitle: string
//   headline: string
//   action: string
// }
export default defineComponent({
  name: 'CouncilListByMinistry',
  setup() {
    const search = ref<String>('');
    const selected = ref<Number[]>([2]);

    const { state: ministryState, getMinistryList } = useMinistry();

    const { state: councilState, getCouncilList } = useCouncil();

    const fetchData = async (offset = 0) => {
      await getMinistryList({ offset });
      await getCouncilList({ offset });
      // console.log('ministryState', ministryState)
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      search,
      selected,
      ...toRefs(ministryState),
      ...toRefs(councilState),
      fetchState,
    };
  },
});
</script>
