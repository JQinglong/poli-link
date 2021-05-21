<template>
  <v-card class="mx-auto">
    <v-card-title>
      {{ councilMeetingData.council.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ councilMeetingData.name }}
    </v-card-subtitle>
    <v-card-text>
      <!-- 議事発言登録 -->
      {{meetingSpeechList.length}}
      <meeting-speech-add :council="councilMeetingData.council" :councilMeeting="councilMeetingData" :speechCount="meetingSpeechList.length" />
      <!-- リスト -->
      <v-list two-line>
        <template v-for="(item, index) in meetingSpeechList">
          <v-list-item :key="item.title">
            <v-list-item-avatar>
              <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.speaker"></v-list-item-title>

              <v-list-item style="white-space: pre-line" v-text="item.speech"></v-list-item>

              <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

              <v-icon @click="editItem(item)">mdi-pencil</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index < meetingSpeechList.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
      <!-- 更新用 -->
      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title class="headline">発言更新</v-card-title>

          <v-text-field label="Order" dense outlined clearable v-model="editedItem.order"> </v-text-field>
          <council-member-select v-model="editedItem.person" :councilId="editedItem.council.id" @selectMember="selectMember" />
          <v-text-field label="発言者" dense outlined clearable v-model="editedItem.speaker"> </v-text-field>
          <v-textarea label="発言" dense outlined clearable v-model="editedItem.speech"> </v-textarea>
          <v-textarea label="備考等" dense outlined clearable v-model="editedItem.description"> </v-textarea>

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
// 発言リスト
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncilMeeting, useMeetingSpeech } from '@/compositions';
import MeetingSpeechAdd from './MeetingSpeechAdd.vue';
import { defaultMeetingSpeechItem } from '@/compositions/util/const'
import { MeetingSpeechType, PersonType, CouncilMemberType } from '@/types';
// import PersonSelect from '../person/PersonSelect.vue';
import CouncilMemberSelect from '../council/CouncilMemberSelect.vue';

export default defineComponent({
  components: { MeetingSpeechAdd, CouncilMemberSelect },
  name: 'MeetingSpeechEdit',
  props: {
    councilId: {
      type: String,
      required: true,
    },
    councilMeetingId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: councilMeetingState, getCouncilMeeting } = useCouncilMeeting();
    const { state: meetingSpeechState,　getMeetingSpeechList, updateMeetingSpeech } = useMeetingSpeech();

    const state = reactive({
      dialogEdit: false,
      editedIndex: '',
      editedItem: defaultMeetingSpeechItem,
    });
    const editItem = (item: MeetingSpeechType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      // console.log('item', state.editedItem);
      state.dialogEdit = true;
    };
    const updateItem = async () => {
      console.log('MeetingSpeechEdit updateItem', state.editedItem);
      await updateMeetingSpeech({ id: state.editedItem.id, payload: state.editedItem });
      closeDelete();
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, defaultMeetingSpeechItem);
        state.editedIndex = '';
      });
    };

    const selectMember = async(item: CouncilMemberType) => {
      console.log('selectMember item.id', item.id)
      state.editedItem.person = item.person
      state.editedItem.speaker = item.name
    }

    const fetchData = async (offset = 0, councilMeetingId = '') => {
      await getCouncilMeeting(props.councilMeetingId);
      await getMeetingSpeechList({ offset: offset, council_meeting: councilMeetingId });
      // console.log('councilMeetingState', councilMeetingState);
    };

    // console.log('props.councilId', props.councilMeetingId);
    const { fetchState } = useFetch(() => fetchData(0, props.councilMeetingId));
    return {
      ...toRefs(councilMeetingState),
      ...toRefs(meetingSpeechState),
      ...toRefs(state),
      editItem,
      updateItem,
      closeDelete,
      selectMember,
    };
  },
});
</script>
