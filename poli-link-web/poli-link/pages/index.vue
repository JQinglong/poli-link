<template>
  <v-card color="indigo lighten-4">
    <council-list-hot />
  </v-card>
</template>

<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api';
import CouncilListItem from '~/components/council/CouncilListItem.vue';
type Item = {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  action: string;
};

export default defineComponent({
  components: { CouncilListItem },
  setup() {
    const search = ref<String>('');
    const selected = ref<Number[]>([2]);
    const sortDesc = ref<Boolean>(false);
    const sortBy = ref<String>('Name');
    const keys = ref<String[]>(['Name']);

    const councils = ref<Item[]>([
      {
        id: '1',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: 'オリンピック組織委員会',
      },
      {
        id: '2',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: '「スーパーシティ」構想の実現に向けた有識者懇談会',
      },
      {
        id: '3',
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: '新型コロナウイルス感染症対策分科会',
      },
    ]);

    return {
      search,
      selected,
      sortDesc,
      keys,
      sortBy,
      councils,
    };
  },
});
</script>
