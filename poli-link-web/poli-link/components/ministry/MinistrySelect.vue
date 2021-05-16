<template>
  <div>
    <v-select
      :items="ministryList"
      @change="handleChange"
      v-model="editableValue"
      item-value="id"
      item-text="name"
      return-object
      label="省庁マスタ"
      dense
      outlined
    ></v-select>
  </div>
</template>


<script lang="ts">
// Ministryプルダウン
import { toRefs, useFetch, defineComponent, reactive, computed, watchEffect } from '@nuxtjs/composition-api';
import { useMinistry } from '@/compositions';
import { MinistryType } from '@/types';
import { defaultMinistryItem } from '@/compositions/util/const'

export default defineComponent({
  name: 'MinistrySelect',

  props: {
    value: {
      type: Object as () => MinistryType ,
      required: true,
    },
  },
  setup(props, ctx) {
    console.log('props', props);
    const { state: ministryState, getMinistryList } = useMinistry();

    // 冗長かもしれない
    const editableValue = computed(() => props.value)
    const state = reactive({
      editableValue: defaultMinistryItem,
    });
    watchEffect(() => {
      // console.log('editableValue', editableValue)
      state.editableValue= editableValue.value
    });

    const handleChange = () => {
      // console.log('handleChange', item)
      ctx.emit('change', state.editableValue);
    };

    const fetchData = async (offset = 0, council = '') => {
      // console.log('council', council)
      await getMinistryList({ offset: offset });
    };

    const { fetchState } = useFetch(() => fetchData(0));
    return {
      ...toRefs(ministryState),
      ...toRefs(state),
      // editableValue,
      handleChange,
      // dispItem,
      // close,
    };
  },
});
</script>