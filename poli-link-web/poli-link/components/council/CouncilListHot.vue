<template>
  <div>
    <v-card dense>
      <v-data-table
        :headers="headers"
        :items="councilList"
        :search="search"
        hide-default-header
        hide-default-footer
        dense>

        <template v-slot:top>
          <v-toolbar dense dark color="teal lighten-2" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              dense
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="キーワード"
            ></v-text-field>
            <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
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
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn depressed small color="teal" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn depressed small color="teal" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template> -->
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
import { ref, reactive, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
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
  name: 'CouncilListHot',
  setup() {
    // const search = ref<String>('');
    const headers = [
      { text: '名前', value: 'name' },
      { text: '説明', value: 'description' },
      { text: '', value: 'actions', sortable: false },
    ];
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false,
    });
    const { state: ministryState, getMinistryList } = useMinistry();

    const { state: councilState, getCouncilList } = useCouncil();

    const fetchData = async (offset = 0) => {
      await getMinistryList({ offset });
      await getCouncilList({ offset });
      console.log('councilState', councilState)
      // console.log('ministryState', ministryState)
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      headers,
      ...toRefs(state),
      ...toRefs(ministryState),
      ...toRefs(councilState),
      fetchState,
    };
  },
});
</script>
