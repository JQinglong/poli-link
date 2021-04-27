<template>
  <v-data-table
    :headers="headers"
    :items="members"
    class="elevation-1"
    hide-default-header=true
    hide-default-footer=true
  >
    <template v-slot:item.position="{ item }">
      <v-chip
        v-if="item.position"
        dark
      >
        {{ item.position }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon color="grey lighten-1" @click="editItem(item)">mdi-information</v-icon>
    </template>

  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      editedIndex: -1,

      headers: [
        { text: 'name', value: 'name' },
        { text: 'position', value: 'position' },
        { text: 'occupation', value: 'occupation' },
        { text: 'actions', value: 'actions' },
      ],
      members: [
        {
          occupation: '慶應義塾大学法科大学院教授',
          name: '磯部 哲',
        },
        {
          occupation: '一般社団法人日本医療法人協会副会長',
          name: '太田 圭洋',
        },
        {
          occupation: 'ヘルスケアコミュニケーションプランナー',
          name: '石川 晴巳',
        },
        {
          occupation: '日本労働組合総連合会副事務局長',
          name: '石田 昭浩',
        },
        {
          occupation: '独立行政法人地域医療機能推進機構理事長',
          name: '尾身 茂',
          position: '分科会長',
        },
      ],

      methods: {
        editItem (item) {
          console.log('item', item)
          this.editedIndex = this.members.indexOf(item)
          this.dialog = true
        },
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedIndex = -1
          })
        },

      }
    }),
  }
</script>