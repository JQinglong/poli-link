<template>
  <v-data-table :headers="headers" :items="councilMemberList" class="elevation-1" hide-default-header>
    <template v-slot:[`item.position`]="{ item }">
      <v-chip v-if="item.position" dark>
        {{ item.position }}
      </v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <!-- <v-icon color="grey lighten-1" @click="dispItem(item)">mdi-information</v-icon> -->
      <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
// 個人キャリアリスト
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { useCouncilMember } from '@/compositions';

export default defineComponent({
  name: 'CouncilMemberList',
  components: { PersonInfo },

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
    const { state: councilMemberState, getCouncilMemberList } = useCouncilMember();

    const fetchData = async (offset = 0, council = '') => {
      console.log('CouncilMemberList fetchData', council)
      await getCouncilMemberList({ offset: offset, council: council });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilMemberState),
      headers,
      // dispItem,
      // close,
    };
  },
});
</script>