<template>
  <div>
    {{councilNewsCount}}
    <v-list three-line v-if="councilNewsCount > 0">
      <v-subheader>関連ニュース</v-subheader>
      <template v-for="(item, index) in councilNewsList">
        <v-list-item :key="index">
          <v-list-item-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.url"></v-list-item-title>
            <v-list-item-subtitle v-html="item"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
// ニュースリスト
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncilNews } from '@/compositions';

export default defineComponent({
  name: 'CouncilNewsList',

  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    // console.log('props', props)
    console.log('props.councilId', props.councilId)
    const headers = [
      { text: 'url', value: 'url' },
      { text: 'actions', value: 'actions' },
    ];
    const { state: councilNewsState, getCouncilNewsList } = useCouncilNews();

    const fetchData = async (offset = 0, council = '') => {
      await getCouncilNewsList({ offset: offset, council: council });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilNewsState),
      headers,
      // dispItem,
      // close,
    };
  },
});
</script>