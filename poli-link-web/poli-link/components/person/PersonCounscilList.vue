<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="councilMemberList"
      hide-default-header
      hide-default-footer
      dense
    >

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          @click="$router.push(`/council/${item.council.id}/`)"
        >
          mdi-forum
        </v-icon>
      </template>
    </v-data-table>

  </div>
</template>

<script lang="ts">
// 参画会議体リスト
import { ref, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
import { CouncilType } from '~/types'
import CouncilMemberListItem from '~/components/council/CouncilMemberListItem.vue';
import { useCouncil, useCouncilMember } from '@/compositions';

export default defineComponent({
  name: 'PersonCounscilList',
  props: {
    personId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const headers = [
      {text: '名称', value: 'council.name'},
      {text: '所属', value: 'occupation'},
      {text: '役職', value: 'position'},
      {text: '', value: 'actions', sortable: false},
    ]

    const { state: councilMemberState, getCouncilMemberList } = useCouncilMember();

    const fetchData = async (offset = 0, personId = '') => {
      console.log('personId', personId)
      await getCouncilMemberList({ offset: offset, person: personId });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.personId));

    return {
      headers,
      ...toRefs(councilMemberState),
    }
  }
})
</script>
