<template>
  <v-row justify="center" align="start">
    <v-col md="8">
      <council-list-hot />
    </v-col>
    <v-col md="4">
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          最新情報
        </v-alert>
        <CouncilMeetingListYM />
      </v-card>
      <br>
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          開発者からのお知らせ
        </v-alert>
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useMeta, computed, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title, meta } = useMeta()
    title.value = "政府会議体議事録検索システム"
    meta.value = [
      {
        hid: 'og:url',
        property: 'og:url',
        content: "https://polilink-web.netlify.app/",
      },
    ]

  },
})
</script>
