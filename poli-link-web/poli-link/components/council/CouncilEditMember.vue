<template>
  <div>
    構成員情報
    <v-data-table :headers="headers" :items="councilMemberList" class="elevation-1" hide-default-header>
      <template v-slot:[`item.position`]="{ item }">
        <v-chip v-if="item.position" dark>
          {{ item.position }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">構成員情報更新</v-card-title>
        <v-text-field label="名前" dense outlined clearable v-model="editedItem.name"> </v-text-field>
        <v-text-field label="所属" dense outlined clearable v-model="editedItem.occupation"> </v-text-field>
        <v-text-field label="役職" dense outlined clearable v-model="editedItem.position"> </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateItem">更新</v-btn>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// 構成員メンテ
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { CouncilType, CouncilMemberType } from '@/types';
import { useCouncilMember } from '@/compositions';
import { defaultCouncilMemberItem } from '@/compositions/util/const'

export default defineComponent({
  name: 'CouncilEditMember',

  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    // console.log('props', props)
    // console.log('props.councilId', props.councilId)
    const headers = [
      { text: 'name', value: 'name' },
      { text: 'position', value: 'position' },
      { text: 'occupation', value: 'occupation' },
      { text: 'actions', value: 'actions' },
    ];
    const {
      state: councilMemberState,
      createState: createCouncilMemberState,
      getCouncilMemberList,
      updateCouncilMember,
    } = useCouncilMember();

    const state = reactive({
      dialogEdit: false,
      editedIndex: '',
      editedItem: defaultCouncilMemberItem,
    });

    const editItem = (item: CouncilMemberType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      console.log('item', state.editedItem);
      state.dialogEdit = true;
    };
    const updateItem = async () => {
      console.log('CouncilEditMember updateItem', state.editedItem);
      await updateCouncilMember({id: state.editedItem.id, payload: state.editedItem}) 
      closeDelete();
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, defaultCouncilMemberItem);
        state.editedIndex = '';
      });
    };

    const fetchData = async (offset = 0, council = '') => {
      console.log('CouncilEdit　council', council);
      await getCouncilMemberList({ offset: offset, council: council });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilMemberState),
      ...toRefs(state),
      headers,
      editItem,
      updateItem,
      closeDelete,
    };
  },
});
</script>