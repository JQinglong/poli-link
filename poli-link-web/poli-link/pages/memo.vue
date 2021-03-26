<template>
  <div class="container">
    <p>{{ info.text }}</p>
    <button @click="onClicked">ボタン</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"

export default defineComponent({
  head: {
    title: "Sample"
  },
  setup() {
    /*
      data() {
        return {
          text: ""
        }
      }
    */
    const info = reactive({
      text: ""
    })

    /*
      created() {
        this.text = "まだ押されていません"
      }
    */
    info.text = "まだ押されていません"

    /*
      methods: {
        onClicked() {
          this.text = "押されたよ！"
        }
      }
    */
    const onClicked = () => {
      info.text = "押されたよ！"
    }

    return { info, onClicked }
  }
})
</script>