<template>
  <v-card class="mx-auto">
    <v-list two-line>
      <template v-for="(item, index) in meetingSpeechList">
        <v-list-item :key="item.title" :id="item.id">
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

            <v-icon @click="editItem(item)" color="grey lighten-1"> mdi-share-variant </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="index < meetingSpeechList.length - 1" :key="index"></v-divider>
      </template>
    </v-list>

    <div id="anchor" style="margin-top: 2000px">到着！</div>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">この発言へのリンク</v-card-title>
        <v-text-field v-model="editedItemUrl" append-icon="mdi-link-variant" filled type="text" @click:append="copyText(editedItemUrl)" onfocus="this.select();"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">閉じる</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script lang="ts">
// 発言リスト
import { ref, toRefs, useFetch, defineComponent, reactive, useContext, onMounted } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { MeetingSpeechType } from '@/types';
import { useMeetingSpeech } from '@/compositions';

export default defineComponent({
  name: 'MeetingSpeechList',
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
    const { route } = useContext();
    const { state: meetingSpeechState, getMeetingSpeechList } = useMeetingSpeech();

    onMounted(() => {
      // const hash = root.$route.hash;
      // console.log('hash', hash);
      // if (hash && hash.match(/^#.+$/)) {
      //   root.$nextTick(() => {
      //     root.$scrollTo(hash)
      //     // root.$router.push({ path: root.$route.path, hash: hash.slice(1) });
      //     console.log('scroled', root.$route.path);
      //   });
      // }
    });

    const state = reactive({
      dialogEdit: false,
      editedIndex: '',
      editedItemUrl: '',
    });
    const editItem = (item: MeetingSpeechType) => {
      state.editedIndex = item.id;
      state.editedItemUrl = `${process.env.WEB_URL}${route.value.path}#${item.id}`;
      state.dialogEdit = true;
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItemUrl = '';
        state.editedIndex = '';
      });
    };

    const copyText = (text: string) => {
      console.log('copy text', text)
      if(navigator.clipboard){
          navigator.clipboard.writeText(text);
      }
    };

    const fetchData = async (offset = 0, councilMeetingId = '') => {
      // console.log('fetchData_council', councilMeetingId);
      await getMeetingSpeechList({ offset: offset, council_meeting: councilMeetingId });
      // console.log('councilMeetingState', councilMeetingState);

      const hash = root.$route.hash;
      console.log('fetchData hash', hash);
      if (hash && hash.match(/^#.+$/)) {
        root.$nextTick().then(() => {
          setTimeout( root.$scrollTo(hash), 10000)
          // root.$router.push({ path: root.$route.path, hash: 'e9854d4d-27ab-4832-b4bc-4a7ae8a8cf02' });
          console.log('scroled', root.$route.path);
        });
      }

    };

    // console.log('props.councilId', props.councilMeetingId);
    const { fetchState } = useFetch(() => fetchData(0, props.councilMeetingId));
    return {
      ...toRefs(meetingSpeechState),
      ...toRefs(state),
      editItem,
      closeDelete,
      copyText,
      // close,
    };
  },
});
</script>
