<template>
  <v-select
    :items="councilMemberList"
    @change="handleChange"
    item-text="name"
    return-object
    label="構成員から選択" dense outlined></v-select>
</template>

<script lang="ts">
// 構成員プルダウン
import { ref, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { useCouncilMember } from '@/compositions';
import { CouncilMemberType } from '@/types';

export default defineComponent({
  name: 'CouncilMemberSelect',
  components: { PersonInfo },

  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const { state: councilMemberState, getCouncilMemberList } = useCouncilMember();
    const handleChange = (item: CouncilMemberType) => {
      console.log('handleChange', item)
      ctx.emit('selectMember', item)
    }

    const fetchData = async (offset = 0, council = '') => {
      // console.log('council', council)
      await getCouncilMemberList({ offset: offset, council: council });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilMemberState),
      handleChange,
      // dispItem,
      // close,
    };
  },
});
</script>