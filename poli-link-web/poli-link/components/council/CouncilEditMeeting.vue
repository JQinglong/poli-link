<template>
  <div>
    議事情報
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> 情報追加 </v-expansion-panel-header>
        <v-expansion-panel-content style="white-space: pre-line">
          <council-meeting-add :council="council" :meetingCount="councilMeetingList.length" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    
    <v-data-table :headers="headers" :items="councilMeetingList" class="elevation-1" hide-default-header>
      <template v-slot:[`item.position`]="{ item }">
        <v-chip v-if="item.position" dark>
          {{ item.position }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="$router.push(`/admin/council/${item.council.id}/${item.id}/edit`)"> mdi-text-to-speech </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">議事情報更新</v-card-title>
        <v-text-field label="Order" dense outlined clearable v-model="editedItem.order"> </v-text-field>
        <v-text-field label="日にち" dense outlined clearable v-model="editedItem.meeting_date"> </v-text-field>
        <v-text-field label="議事名" dense outlined clearable v-model="editedItem.name"> </v-text-field>
        <v-text-field label="場所" dense outlined clearable v-model="editedItem.place"> </v-text-field>
        <v-text-field label="議事録URL" dense outlined clearable v-model="editedItem.url_minute"> </v-text-field>
        <v-text-field label="資料URL" dense outlined clearable v-model="editedItem.url_document"> </v-text-field>
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
// 議事情報メンテ
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive, watchEffect } from '@nuxtjs/composition-api';
import { CouncilType, CouncilMeetingType } from '@/types';
import { useCouncilMeeting } from '@/compositions';
import { defaultCouncilMeetingItem } from '@/compositions/util/const'

import CouncilMeetingAdd from './CouncilMeetingAdd.vue';
export default defineComponent({
  name: 'CouncilEditMeeting',
  components: { CouncilMeetingAdd },

  props: {
    // councilId: {
    //   type: String,
    //   required: true,
    // },
    council: {
      type: Object as () => CouncilType,
      required: true,
    },
  },
  setup(props, { root }) {
    // console.log('props', props)
    // console.log('props.councilId', props.councilId)
    const headers = [
      { text: 'order', value: 'order' },
      { text: '日にち', value: 'meeting_date' },
      { text: '議事名', value: 'name' },
      { text: 'actions', value: 'actions' },
    ];
    const {
      state: councilMeetingState,
      createState: createCouncilMeetingState,
      getCouncilMeetingList,
      updateCouncilMeeting,
    } = useCouncilMeeting();

    const state = reactive({
      dialogEdit: false,
      editedIndex: '',
      editedItem: defaultCouncilMeetingItem,
    });

    const editItem = (item: CouncilMeetingType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      console.log('item', state.editedItem);
      state.dialogEdit = true;
    };
    const updateItem = async () => {
      console.log('CouncilEditMeeting updateItem', state.editedItem);
      await updateCouncilMeeting({ id: state.editedItem.id, payload: state.editedItem });
      closeDelete();
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, defaultCouncilMeetingItem);
        state.editedIndex = '';
      });
    };

    const fetchData = async (offset = 0, councilId: string = '') => {
      console.log('CouncilEditMeeting　councilId', councilId);
      await getCouncilMeetingList({ offset: offset, council: councilId });
    };

    watchEffect(() => {
      // console.log('editableValue', editableValue)
      fetchData(0, props.council.id)
    });

    const { fetchState } = useFetch(() => fetchData(0, props.council.id));

    return {
      ...toRefs(councilMeetingState),
      ...toRefs(state),
      headers,
      editItem,
      updateItem,
      closeDelete,
    };
  },
});
</script>