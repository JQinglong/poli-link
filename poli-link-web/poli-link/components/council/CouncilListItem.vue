<template>
<div>
  <v-card>
    <v-card-title v-text="card.title"></v-card-title>
    <v-card-text>
      説明
      説明
      説明
      説明
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="ml-2 mt-5"
        outlined
        rounded
        small
        @click="$router.push('/council/abc/')"
      >
        詳細を見る
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
  export default {
    data: () => ({
      card: { title: '新型コロナウイルス感染症対策分科会', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 }
    }),
  }
</script>
