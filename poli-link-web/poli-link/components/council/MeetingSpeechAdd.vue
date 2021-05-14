<template>
  <v-card>
    <v-card-text>
      議事発言登録
      <v-form lazy-validation>
        <v-text-field label="Order" dense outlined clearable v-model="editableSpeechCount"> </v-text-field>
        <council-member-select :councilId="council.id" @selectMember="selectMember" />
        form.person {{form.person}}
        <person-select v-model="form.person" @change="selectPerson" />
        <v-text-field label="発言者" dense outlined clearable v-model="form.speaker"> </v-text-field>
        <v-textarea label="発言" dense outlined clearable v-model="form.speech"> </v-textarea>
        <v-textarea label="備考等" dense outlined clearable v-model="form.description"> </v-textarea>
        <v-btn color="primary" @click="handleCreateMeetingSpeech">発言追加</v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watchEffect, toRefs } from '@nuxtjs/composition-api';
import { useMeetingSpeech } from '@/compositions';
import { CouncilType, CouncilMeetingType, CouncilMemberType, PersonType } from '@/types';
import CouncilMemberSelect from './CouncilMemberSelect.vue';
import PersonSelect from '../person/PersonSelect.vue';

export default defineComponent({
  components: { CouncilMemberSelect, PersonSelect },
  name: 'MeetingSpeechAdd',
  props: {
    council: {
      type: Object as () => CouncilType,
      required: true,
    },
    councilMeeting: {
      type: Object as () => CouncilMeetingType,
      required: true,
    },
    speechCount: {
      type: Number,
      required: false,
    },
  },
  setup(props, { root }) {

    const { createState: createMeetingSpeechState, createMeetingSpeech, } = useMeetingSpeech();

    // createMeetingSpeechState.order = props.speechCount || 0 + 1
    // 冗長かもしれない
    const propsSpeechCount = computed(() => props.speechCount || 0)
    const state = reactive({
      editableSpeechCount: 0,
    });
    watchEffect(() => {
      // console.log('editableValue', editableValue)
      state.editableSpeechCount= propsSpeechCount.value + 1
      createMeetingSpeechState.order = propsSpeechCount.value + 1
    });


    const selectMember = async(item: CouncilMemberType) => {
      createMeetingSpeechState.speaker = item.name
      console.log('item.person', item.person)
      createMeetingSpeechState.person = item.person
    }

    const selectPerson = async(item: PersonType) => {
      console.log('selectPerson item.id', item.id)
      createMeetingSpeechState.person = item.id
      createMeetingSpeechState.speaker = item.name
    }

    const handleCreateMeetingSpeech = async () => {
      try {
        console.log('createMeetingSpeechState', createMeetingSpeechState);
        createMeetingSpeechState.council = props.council
        createMeetingSpeechState.council_meeting = props.councilMeeting
        const newMeetingSpeech = await createMeetingSpeech(createMeetingSpeechState); //こことformを結びつける

        if (!newMeetingSpeech) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    // const fetchData = async (offset = 0) => {
    //   await getMeetingSpeechList({ offset });
    //   console.log('fetchData');
    // };

    // const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      form: createMeetingSpeechState,
      ...toRefs(state),
      handleCreateMeetingSpeech,
      selectMember,
      selectPerson,
    };
  },
});
</script>

<style>
</style>