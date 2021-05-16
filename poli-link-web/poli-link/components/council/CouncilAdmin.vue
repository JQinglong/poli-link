<template>
  <v-card>
    <v-card-title> 会議体の管理 </v-card-title>
    <v-card-text>
      https://polilink-web.herokuapp.com/admin/

    <!-- 会議体追加 -->
     <council-add />

      <v-data-table :headers="headers" :items="councilList" dense>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="$router.push(`/admin/council/${item.id}/edit`)"> mdi-pencil </v-icon>
        </template>
      </v-data-table>

    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Data, defineComponent, reactive, ref, toRef, toRefs, useFetch, onMounted } from '@nuxtjs/composition-api';
import { useCouncil } from '@/compositions';
import { defaultCouncilItem } from '@/compositions/util/const'

// const CouncilRepository = RepositoryFactory.get('council')
// interface StateData {
//   id: number
//   title: string
//   council: string
//   isLoading: boolean,
//   councils: []
// }

import { CouncilType, MinistryType } from '@/types';
import CouncilAdd from './CouncilAdd.vue';

export default defineComponent({
  components: { CouncilAdd },
  name: 'CouncilAdmin',
  setup(_, { root }) {
    const headers = [
      { text: '名前', value: 'name' },
      { text: '', value: 'actions', sortable: false },
    ];

    const state = reactive({
      dialogDelete: false,
      editedIndex: -1,
      editedItem: defaultCouncilItem,
    });

    // const {
    //   state: councilListState,
    //   getCouncilList,
    // } = useCouncilList()

    const { state: councilState, createState: createCouncilState, createCouncil, getCouncilList } = useCouncil();

    const handleCreateCouncil = async () => {
      try {
        console.log('createCouncilState', createCouncilState)
        const newCouncil = await createCouncil(createCouncilState); //こことformを結びつける

        if (!newCouncil) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };


    const fetchData = async (offset = 0) => {
      await getCouncilList({ offset });
      console.log('fetchData');
    };

    const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      headers,
      ...toRefs(state),
      fetchState,
      fetchData,
      ...toRefs(councilState),
      form: createCouncilState,
      handleCreateCouncil,
    };
  },

});
</script>

<style>
</style>