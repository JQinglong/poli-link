<template>
  <div>
    <v-card dense>

      <v-card>
        <v-tabs
          dark background-color="blue-grey darken-4" show-arrows
          v-model="tabModel"
        >
          <v-tab
            v-for="ministry in ministryList"
            :key="ministry.id"
          >
            {{ ministry.name }}
          </v-tab>
        </v-tabs>
        <!-- 
        <v-tabs-items v-model="tabModel">
          <v-tab-item
            v-for="ministry in ministryList"
            :key="ministry.id"
          >
            <v-card flat>
              <v-card-text>{{ ministry.name }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items> -->
      </v-card>

      <v-data-table
        :headers="headers"
        :items="councilList"
        :search="search"
        hide-default-header
        hide-default-footer
        dense
      >
        <template v-slot:header>
          <v-toolbar dense dark color="teal lighten-2" class="mb-1">
            <v-text-field
              dense
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>

        <!-- <template v-slot:top>
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
        </template> -->
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
  name: 'CouncilListByMinistry',
  setup() {
    // const search = ref<String>('');
    // const selected = ref<Number[]>([2]);
    const sortDesc = ref<Boolean>(false);
    const sortBy = ref<String>('Name');
    const keys = ref<String[]>(['Name']);
    // const tabModel = 'tab-0'; //tab制御が効かないので中止

const state = reactive({
      search: '',
      filter: {},
      sortDesc: false,
      tabModel: 0,
    });
    const { state: ministryState, getMinistryList } = useMinistry();

    const { state: councilState, getCouncilList } = useCouncil();

    const headers = [
      { text: '省庁',
        value: 'ministry.id',
        filter: (value: string) => {
          if (ministryState.ministryList && state.tabModel < (ministryState.ministryList.length - 1)) {
            return value == ministryState.ministryList[state.tabModel + 1].id
          } else {
            return true
          }
        },
      },
      { text: '名前', value: 'name' },
      { text: '説明', value: 'description' },
      { text: '', value: 'actions', sortable: false },
    ];


    const fetchData = async (offset = 0) => {
      await getMinistryList({ offset });
      await ministryState.ministryList.unshift({id:'0', name: '全て', name_e: '', abbreviation: '', url: ''})
      await getCouncilList({ offset });
      // console.log('ministryState', ministryState)
      state.tabModel = ministryState.ministryList.length - 1
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      headers,
      ...toRefs(state),
      sortDesc,
      keys,
      sortBy,
      // tabModel,
      ...toRefs(ministryState),
      ...toRefs(councilState),
      fetchState,
    };
  },
});
</script>
