<template>
  <v-card>
    <v-card-title> 会議体 の管理 </v-card-title>
    <v-card-text>
      https://polilink-web.herokuapp.com/admin/
      <!-- <v-form lazy-validation>
        <v-text-field label="名前" dense outlined clearable v-model="form.name"> </v-text-field>
        <v-text-field label="url" dense outlined clearable v-model="form.url"> </v-text-field>
        <v-text-field label="ministry_id" dense outlined clearable v-model="form.ministry_id"> </v-text-field>
        ministryはオブジェクトを渡さないといけなくなってしまったので、登録はDjango管理画面から
        <v-textarea
          v-model="form.description"
          label="説明など"
          auto-grow
          outlined
          rows="3"
          row-height="25"
          shaped
        ></v-textarea>

        <v-btn color="primary" @click="handleCreateCouncil">新規</v-btn>
      </v-form> -->

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

// const CouncilRepository = RepositoryFactory.get('council')
// interface StateData {
//   id: number
//   title: string
//   council: string
//   isLoading: boolean,
//   councils: []
// }

import { CouncilType } from '@/types';

export default defineComponent({
  name: 'CouncilAdmin',
  setup(_, { root }) {
    const headers = [
      { text: '名前', value: 'name' },
      { text: '', value: 'actions', sortable: false },
    ];

    const defaultItem: CouncilType = {
      id: '',
      name: '',
      url: '',
      description: '',
      ministry_id: '',
    };

    const state = reactive({
      dialogDelete: false,
      editedIndex: -1,
      editedItem: defaultItem,
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