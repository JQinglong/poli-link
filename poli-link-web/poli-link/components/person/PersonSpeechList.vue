<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
    >
      <template v-slot:header>
        <v-toolbar
          dense
          dark
          color="teal lighten-2"
          class="mb-1"
        >
          <v-text-field
            dense
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              dense
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                small
                depressed
                color="teal"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                small
                depressed
                color="teal"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>
              {{ item.speech }}
              <v-divider></v-divider>
              <v-icon @click="$router.push(`/council/1/2/#1234`)">mdi-information</v-icon>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 60,
        sortBy: 'name',
        keys: [
          'Id',
          'Date',
          'Name',
        ],
        items: [
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり
をいただきまして、誠にありがとうございます。御承知のように、５月25日に緊
急事態宣言が全国的に解除されてから１か月少々経過しているわけであります。
3
この間、厚労省としては、再び新型コロナウイルス感染症の感染が拡大する局面
も見据え、検査体制、医療提供体制、保健所体制に対する体制整備の在り方につ
いて考え方をお示しした上で、都道府県に対応をお願いしているところでありま
す。引き続き都道府県とも連携の上、これらの体制整備に努めてまいります。
また、検査や感染拡大防止に向けた取組として、唾液を用いたPCR検査の保険適用、
30分程度でPCR検査同様の対象に使用できる抗原定量検査の承認、さらには、７月
５日時点で570万人の方にダウンロードしていただいておりますが、陽性者と接触
した可能性がある場合に通知を受け取ることができる接触確認アプリ（COCOA）の
リリースなどにも取り組んでまいりました。引き続き、こうした検査体制の拡充
やアプリの利用拡大などにも努めてまいります。`,
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
          {
            id: 'a',
            name: '新型コロナウイルス感染症対策分科会　堕1回会議',
            date: '2021/1/4',
            speech: `本日は、構成員の皆様方におかれましては、大変御多忙の中こうしてお集まり`
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Id')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
  }
</script>