<template>
  <v-card>
    <v-card-text>
      会議登録
      <v-form lazy-validation>
        <v-text-field label="Order" dense outlined clearable v-model="editableSpeechCount"> </v-text-field>
        <v-text-field label="開催日" dense outlined clearable v-model="form.meeting_date" date-format="MM/dd/yyyy"> </v-text-field>
        <v-text-field label="会議名" dense outlined clearable v-model="form.name"> </v-text-field>
        <v-text-field label="場所" dense outlined clearable v-model="form.place"> </v-text-field>
        <v-text-field label="議事録URL" dense outlined clearable v-model="form.url_minute"> </v-text-field>
        <v-text-field label="資料URL" dense outlined clearable v-model="form.url_document"> </v-text-field>
        <v-btn color="primary" @click="handleCreateCouncilMeeting">追加</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watchEffect, toRefs } from '@nuxtjs/composition-api';
import { useCouncilMeeting } from '@/compositions';
import { CouncilType, CouncilMeetingType } from '@/types';

export default defineComponent({
  name: 'CouncilMeetingAdd',
  props: {
    council: {
      type: Object as () => CouncilType,
      required: true,
    },
    meetingCount: {
      type: Number,
      required: false,
    },
  },
  setup(props, { root }) {

    const { createState: createCouncilMeetingState, createCouncilMeeting, } = useCouncilMeeting();

    // 冗長かもしれない
    const propsMeetingCount = computed(() => props.meetingCount || 0)
    const state = reactive({
      editableSpeechCount: 0,
    });
    watchEffect(() => {
      // console.log('editableValue', editableValue)
      state.editableSpeechCount= propsMeetingCount.value + 1
      createCouncilMeetingState.order = propsMeetingCount.value + 1
    });

    const handleCreateCouncilMeeting = async () => {
      try {
        console.log('createCouncilMeetingState', createCouncilMeetingState);
        createCouncilMeetingState.council = props.council
        const newCouncilMeeting = await createCouncilMeeting(createCouncilMeetingState); //こことformを結びつける

        if (!newCouncilMeeting) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    // const fetchData = async (offset = 0) => {
    //   await getCouncilMeetingList({ offset });
    //   console.log('fetchData');
    // };

    // const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      form: createCouncilMeetingState,
      ...toRefs(state),
      handleCreateCouncilMeeting,
    };
  },
});
</script>

<style>
</style>