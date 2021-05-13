<template>
  <v-card>
    <v-card-text>
      議事発言登録
      <v-form lazy-validation>
        <v-text-field label="Order" dense outlined clearable v-model="form.order"> </v-text-field>
        <council-member-select :councilId="council.id" @selectMember="selectMember" />
        personselect
        <v-text-field label="発言者" dense outlined clearable v-model="form.speaker"> </v-text-field>
        <v-textarea label="発言" dense outlined clearable v-model="form.speech"> </v-textarea>
        <v-textarea label="備考等" dense outlined clearable v-model="form.description"> </v-textarea>
        <v-btn color="primary" @click="handleCreateMeetingSpeech">発言追加</v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent } from '@nuxtjs/composition-api';
import { useMeetingSpeech } from '@/compositions';
import { CouncilType, CouncilMeetingType, CouncilMemberType } from '@/types';
import CouncilMemberSelect from './CouncilMemberSelect.vue';

export default defineComponent({
  components: { CouncilMemberSelect },
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
  },
  setup(props, { root }) {

    const { createState: createMeetingSpeechState, createMeetingSpeech, } = useMeetingSpeech();

    const selectMember = async(item: CouncilMemberType) => {
      createMeetingSpeechState.speaker = item.name
      createMeetingSpeechState.person = item.person
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
      handleCreateMeetingSpeech,
      selectMember,
    };
  },
});
</script>

<style>
</style>