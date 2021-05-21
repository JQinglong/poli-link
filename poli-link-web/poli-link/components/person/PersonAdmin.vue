<template>
  <v-card>
    <v-card-title> 構成員の管理 </v-card-title>
    <v-card-text>

    <!-- 構成員追加 -->
     <person-add />

      <v-data-table
        :headers="headers"
        :items="personList"
        :search="search"
        dense>
        <template v-slot:top>
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
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title class="headline">構成員情報更新</v-card-title>
          <v-text-field label="名前" dense outlined clearable v-model="editedItem.name"> </v-text-field>
          <v-text-field label="名前かな" dense outlined clearable v-model="editedItem.name_kana"> </v-text-field>
          <v-text-field label="名前英語" dense outlined clearable v-model="editedItem.name_e"> </v-text-field>
          <v-text-field label="オフィシャルURL" dense outlined clearable v-model="editedItem.url_official"> </v-text-field>
          <v-text-field label="wikipedia URL" dense outlined clearable v-model="editedItem.url_wikipedia"> </v-text-field>
          <v-text-field label="twitter URL" dense outlined clearable v-model="editedItem.url_twitter"> </v-text-field>
          <v-text-field label="facebook URL" dense outlined clearable v-model="editedItem.url_facebook"> </v-text-field>
          <v-text-field label="youtube URL" dense outlined clearable v-model="editedItem.url_youtube"> </v-text-field>
          <v-textarea label="キャリア概要" dense outlined clearable v-model="editedItem.career_summary"> </v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="updateItem">更新</v-btn>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Data, defineComponent, reactive, ref, toRef, toRefs, useFetch, onMounted } from '@nuxtjs/composition-api';
import { usePerson } from '@/compositions';
import { defaultPersonItem } from '@/compositions/util/const'

import { CouncilType, MinistryType, PersonType } from '@/types';
import PersonAdd from './PersonAdd.vue';

export default defineComponent({
  components: { PersonAdd },
  name: 'PersonAdmin',
  setup(_, { root }) {
    const headers = [
      { text: '氏名', value: 'name' },
      { text: 'かな', value: 'name_kana' },
      { text: '', value: 'actions', sortable: false },
    ];

    const state = reactive({
      search: '',
      dialogEdit: false,
      editedIndex: '',
      editedItem: defaultPersonItem,
    });

    // const {
    //   state: councilListState,
    //   getCouncilList,
    // } = useCouncilList()

    // const { state: councilState, createState: createCouncilState, createCouncil, getCouncilList } = useCouncil();
    const { state: personState, createState: createPersonState, createPerson, updatePerson , getPersonList } = usePerson();

    const editItem = (item: PersonType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      console.log('item', state.editedItem);
      state.dialogEdit = true;
    };
    const updateItem = async () => {
      console.log('CouncilEditMeeting updateItem', state.editedItem);
      await updatePerson({ id: state.editedItem.id, payload: state.editedItem });
      closeDelete();
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, defaultPersonItem);
        state.editedIndex = '';
      });
    };

    const handleCreateCouncil = async () => {
      try {
        console.log('createPersonState', createPersonState)
        const newCouncil = await createPerson(createPersonState); 

        if (!newCouncil) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };


    const fetchData = async (offset = 0) => {
      await getPersonList({ offset });
      console.log('fetchData');
    };

    const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      headers,
      ...toRefs(state),
      fetchState,
      fetchData,
      ...toRefs(personState),
      form: createPersonState,
      handleCreateCouncil,
      editItem,
      updateItem,
      closeDelete,
    };
  },

});
</script>

<style>
</style>