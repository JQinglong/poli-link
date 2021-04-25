<template>
  <div>
    <v-responsive :aspect-ratio="3 / 2">
      <v-parallax dark>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="text-h3 font-weight-black mb-4 text-left white--text">
              Poli Link
            </h1>
            <p
              class="base-body text-body-1 grey--text text--lighten-1 text-left mb-10"
            >
              政策がどう決まっていくのか、記録を残す。<br />
            </p>
            <div>
              <v-btn depressed color="primary" to="/">サービスを利用する</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item color="purple lighten-2" fill-dot right>
          <v-card>
            <v-card-title class="purple lighten-2">
              <v-icon dark size="42" class="mr-4"> mdi-magnify </v-icon>
              <h3 class="white--text font-weight-light">
                どんな会議体があるのか
              </h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down text-right" md="2">
                  <v-icon size="64"> mdi-calendar-text </v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  政府は、政策決定そのた行政運営のための様々な会議体を開催しています。<br />
                  審議会、懇談会、専門家会議、などなど、様々な会議体が存在します。<br />
                  そして、これらは省庁ごとに組織されているため、網羅的にみることはできないと思います。<br />
                  本サイトは、どんな会議体がどんな活動をしているのかを見やすく提示することを目的としています。
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="amber darken-1" fill-dot left small>
          <v-card>
            <v-card-title class="amber darken-1 justify-end">
              <h3 class="mr-4 white--text font-weight-light">
                会議体にはどんな立場の人が参加しているのか
              </h3>
              <v-icon dark size="42"> mdi-home-outline </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  多様な意見を収集するために、会議体には様々な立場の人が参加していると思います。<br />
                  どの人が、どんな立場で参加し、意見を出しているのか、確認できるように参加者リストを提供します。<br />
                  参加者の公開情報もリンクし、立場、背景を理解できるようにします。
                </v-col>
                <v-col class="hidden-sm-and-down text-right" md="2">
                  <v-icon size="64"> mdi-calendar-text </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="cyan lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="cyan lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-email-outline </v-icon>
              <h3 class="white--text font-weight-light">
                この人は、どの会議に参加しているのか
              </h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down text-right" md="2">
                  <v-icon size="64"> mdi-calendar-text </v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  参加者の中には、複数の様々な会議体に参加している人もいます。<br />
                  参加者と会議体のリンクを作ることで、人に着目した活動の追跡もできるようにします。
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="green lighten-1" fill-dot left small>
          <v-card>
            <v-card-title class="green lighten-1 justify-end">
              <h3 class="mr-4 white--text font-weight-light">
                議事録リンク
              </h3>
              <v-icon dark size="42"> mdi-account-multiple-outline </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  議事の発言ごとにパーマリンクを提供します。<br />
                  発言に着目して、さらに議論を深めることができ、その議論から本来の発言の文脈に戻ってくることができるようになります。
                </v-col>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="64"> mdi-server-network </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="indigo lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="indigo lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-phone-in-talk </v-icon>
              <h3 class="white--text font-weight-light">市民による行政活動への参加のために</h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  結局のところこれは、市民による、行政の議論への参加のためのツールです。<br />
                  会議体において、本当に多様な意見が反映されているのか、これを監視するところからでも行政活動への参加は始められます。
                  さらに、会議体への議論について討論をすることで、参加者への働きかけもできるようになるでしょう。
                  できることは色々あるはずです。
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-responsive>
  </div>
</template>

<script>
export default {
  layout: "lp", // レイアウトファイルを指定

  data: () => ({
    items: [
      {
        color: "purple darken-1",
        icon: "mdi-book-variant",
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon",
      },
      {
        color: "indigo",
        icon: "mdi-buffer",
      },
    ],
    title: "VIEW Note",
  }),
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: "description" },
      ],
    };
  },
};
</script>