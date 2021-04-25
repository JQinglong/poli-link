<template>
  <div>
    <v-responsive :aspect-ratio="3 / 2">
      <v-parallax dark>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="text-h3 font-weight-black mb-4 text-left white--text">
              VIEW Note
            </h1>
            <p
              class="base-body text-body-1 grey--text text--lighten-1 text-left mb-10"
            >
              動画で学んで、ノートをとる。<br />
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
                目次で動画の全体像を把握
              </h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  目次を見ることで動画全体の概要が把握できます。<br />
                  気になるところにジャンプしたり、繰り返し見たりが、簡単にできます。
                </v-col>
                <v-col class="hidden-sm-and-down text-right" md="2">
                  <v-icon size="64"> mdi-calendar-text </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="amber darken-1" fill-dot left small>
          <v-card>
            <v-card-title class="amber darken-1 justify-end">
              <h3 class="mr-4 white--text font-weight-light">
                既存の動画に目次を付けられる
              </h3>
              <v-icon dark size="42"> mdi-home-outline </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  （登録者向け機能）動画の時間位置が自動表示されるので、目次作りが簡単にできます。
                </v-col>
                <v-col cols="12" md="4">
                  Lorem ipsum dolor sit amet, no nam oblique veritus.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="cyan lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="cyan lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-email-outline </v-icon>
              <h3 class="white--text font-weight-light">動画を見ながらノートをとる</h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col v-for="n in 3" :key="n" cols="12" md="4">
                  時間位置と連動しているので、動画のどの部分についてのノートなのかが、後から見返しやすくなります。
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="green lighten-1" fill-dot left small>
          <v-card>
            <v-card-title class="green lighten-1 justify-end">
              <h3 class="mr-4 white--text font-weight-light">
                シリーズ講座を作れる！
              </h3>
              <v-icon dark size="42"> mdi-account-multiple-outline </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="64"> mdi-server-network </v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  （登録者向け機能）一つのVIEWに複数動画を登録できますので、複数回の講座を一つのシリーズとしてまとめることができます。
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item color="indigo lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="indigo lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-phone-in-talk </v-icon>
              <h3 class="white--text font-weight-light">みんなのノートも覗き見…</h3>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  公開されているノートを見ることができます。
                  みんなのノートも時間位置と連動しているので、「この場面でみんなこんなこと考えているんだ」という共有ができます。
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