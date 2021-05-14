<template>
  <div>
    <v-select
      :items="personList"
      @change="handleChange"
      v-model="editableValue"
      item-value="id"
      item-text="name"
      return-object
      label="人物マスタ"
      dense
      outlined
    ></v-select>
  </div>
</template>


<script lang="ts">
// Personプルダウン
import { toRefs, useFetch, defineComponent, reactive, computed, watchEffect } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { usePerson } from '@/compositions';
import { PersonType } from '@/types';

export default defineComponent({
  name: 'PersonSelect',
  components: { PersonInfo },

  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    console.log('props', props);
    const { state: personState, getPersonList } = usePerson();

    // 冗長かもしれない
    const editableValue = computed(() => props.value)
    const state = reactive({
      editableValue: '',
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
      await getPersonList({ offset: offset });
    };

    const { fetchState } = useFetch(() => fetchData(0));
    return {
      ...toRefs(personState),
      ...toRefs(state),
      // editableValue,
      handleChange,
      // dispItem,
      // close,
    };
  },
});
</script>