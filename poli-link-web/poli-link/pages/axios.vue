<template>
  <div class="justify-center items-center text-center mx-auto">
    <h1>randomCat (axios)</h1>
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="changeCat">
      change 🐱
    </button>
    <br><br>
    <img :src="state.cat_url" alt="">
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, reactive } from "@vue/composition-api";
import { $axios } from "~/utils/api";

export default defineComponent({
  setup() {
    const state = reactive({
      cat_url: '' as string
    })
    const asyncFunc = async () : Promise<void> => {
      const CatObj: {file: string} = await $axios.$get('https://aws.random.cat/meow')
      console.log('CatObj', CatObj)
      state.cat_url = CatObj.file
    }
    const changeCat = () => { asyncFunc() }

    onMounted(() => { asyncFunc() })

    return {
      state, changeCat
    }
  }
})
</script>