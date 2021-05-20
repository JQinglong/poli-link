<template>
  <div>
    <v-card dense>
      <v-data-table :items="councilList" :search="search" hide-default-footer dense>
        <template v-slot:item="{ item }">
          <council-list-item :council="item" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
import CouncilListItem from '~/components/council/CouncilListItem.vue';
import { useMinistry, useCouncil } from '@/compositions';

// type CounsilItem = {
//   id: string
//   title: string
//   subtitle: string
//   headline: string
//   action: string
// }
export default defineComponent({
  name: 'CouncilListHot',
  setup() {
    const search = ref<String>('');
    const selected = ref<Number[]>([2]);

    const { state: ministryState, getMinistryList } = useMinistry();

    const { state: councilState, getCouncilList } = useCouncil();

    const fetchData = async (offset = 0) => {
      await getMinistryList({ offset });
      await getCouncilList({ offset });
      console.log('councilState', councilState)
      // console.log('ministryState', ministryState)
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      search,
      selected,
      ...toRefs(ministryState),
      ...toRefs(councilState),
      fetchState,
    };
  },
});
</script>
