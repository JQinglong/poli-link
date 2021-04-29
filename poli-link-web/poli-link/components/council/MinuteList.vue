<template>
  <v-card class="mx-auto">
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-avatar>
            <v-icon color="grey lighten-1" @click="$router.push(`/person/123/`)"> mdi-tooltip-account </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>

            <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>

            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

            <v-icon color="grey lighten-1"> mdi-share-variant </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
// 発言リスト
export default {
  data: () => ({
    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `第１回「新型コロナウイルス感染症対策分科会」の開催に当たりまして、一言
御挨拶申し上げたいと思います。先生方におかれては、お忙しいところお集まり
をいただきまして、ありがとうございます。`,
        title: '西村国務大臣挨拶',
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり
をいただきまして、誠にありがとうございます。御承知のように、５月25日に緊
急事態宣言が全国的に解除されてから１か月少々経過しているわけであります。`,
        title: '加藤厚生労働大臣挨拶',
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: '尾身分科会長挨拶',
      },
      {
        action: '',
        headline: '',
        subtitle: '',
        title: '（報道関係者退室） ',
      },
      {
        action: '18hr',
        headline: '資料１を説明',
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: '事務局（鳥井） ',
      },
    ],
  }),
};
</script>
