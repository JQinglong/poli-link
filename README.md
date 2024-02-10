Poli Link
====

政策がどう決まっていくのか、記録を残す。
- どんな会議体があるのか
- 会議体にはどんな立場の人が参加しているのか
- この人は、どの会議に参加しているのか

こんなことを、「議事録」を通じて見えるようにするためのアプリです。

## Demo

停止中
別リポジトリに移行予定です

## Feature

- 会議体検索
  - 会議体を一覧から探します
- 構成員検索
  - 会議体の構成員になっている人物を一覧から探します
- 会議体情報
  - その会議体の構成んは誰か、いつ会議が行われているかの情報を見て、さらに、各会議の議事録を確認します
- 構成員情報
  - その人物は、どのような会議体に参加しているか、どのような発言をしているのかを確認します

## Requirement

大きく、Webインターフェース、API、DBの３構成になっています。

各構成のソフトウェア基盤として、以下のものを使用しています。

### Web

- Nuxt.js
  - TypeScript
  - Composition API
  - Vuetify
- Firebase
- Netlify

### API

- Django REST Framework
- Heroku

### DB

- MySQL
- Heroku ClearDB MySQL

### Docker Compose

開発環境では、各構成をDocker Compose配下で動かします。

## Install

基本的には、
```sh
docker-compose up
```
で起動します。

## Contribution

（準備します）

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

にするつもりですが、もう少し準備します。
