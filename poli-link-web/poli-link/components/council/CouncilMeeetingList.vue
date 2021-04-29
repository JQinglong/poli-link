<template>
<div>
        <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col>
              <strong>2020/7/6</strong>

              <strong>{{ item.name }}</strong>
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="$router.push(`/council/111/1234/`)"
              >
                議事
              </v-btn>
            </v-col>
          </v-row>
        </v-timeline-item>

      </v-timeline>
</div>
</template>

<script>
  // 会議一覧
  import PersonInfo from '../person/PersonInfo.vue'
  export default {
  components: { PersonInfo },
    data: () => ({

      items: [
        {
          occupation: '慶應義塾大学法科大学院教授',
          name: '第1回',
        },
        {
          occupation: '一般社団法人日本医療法人協会副会長',
          name: '第2回',
        },
        {
          occupation: 'ヘルスケアコミュニケーションプランナー',
          name: '第3回',
        },

      ],
    }),


  }
</script>