技術選定
Nuxt Type

API
　google spreadsheet api　直接使用は依存しすぎるのでダメ
　GoogleSpread　→HerokuDBは良いと思う
　HerokuDB用API
　REST API開発に特化したWebフレームワークがもたらす生産性の向上
　https://eng-blog.iij.ad.jp/archives/5415
　候補
　Django REST Framework
　・Javaは捨て難いけど
　・言語トレンド
　DB作るのはしんどいけど
　パッケージのインストールならpip，仮想環境の構築ならvirtualenv（venv）を使えば対応できますが，pipenvはそれらをまとめてより簡単に扱えるようにサポートしてくれます．
APIもherokuにデプロイ

DB
　herokuは本来はPostgreSQL
　チャレンジしてみる
　マイグレーションもsqliteではなくpostgresにすることを考慮
　docker-composeでDjango開発環境を構築する
　https://zenn.dev/dsonoda/articles/dbe14ca8af617ed85b1f
　（必要なら）Pythonのmigrationツールのalembicを動かしてみた
　https://qiita.com/penpenta/items/c993243c4ceee3840f30

サンプルデータのバックアップ
```sh
$ docker exec -it poli-link-db mysqldump --all-databases > poli-link-db/mysql/dmp/sample.dmp
$ docker exec -i poli-link-db mysql < poli-link-db/mysql/dmp/sample.dmp


$ docker exec -it poli-link-db sh
# mysqldump --all-databases > /var/lib/mysql/dmp/20210505.dmp
```


構成複雑なので、Docker使う

Django + REST framework + Swagger + JWT + docker-compose で開発環境構築
https://qiita.com/mykysyk@github/items/fef6fb298393a029a5d4


MYSQL_USER="root", MYSQL_PASSWORD cannot be used for the root user Use・・・
で動かない場合は
docker-compose.yml
    image: mysql:5.7
を
    image: mysql:5.7.32
に変更

Firebase
poli-link-web/poli-link/.env
```
FIREBASE_PROJECT_ID = "polilink-xxx"
FIREBASE_API_KEY = "xxx"
FIREBASE_AUTH_DOMAIN = "polilink-xxx.firebaseapp.com"
FIREBASE_DATABASE_URL = ""
FIREBASE_STORAGE_BUCKET = "polilink-xxx.appspot.com"
FIREBASE_MESSAGING_SENDER_ID = "xxx"
FIREBASE_APP_ID = "1:xxx:web:xxx"
FIREBASE_MEASUREMENT_ID = ""
```




大きな構成は下記
```
PoliLink
├── PolyLink.md
├── docker-compose.yml 
├── .git
├── .gitignore
├── README.md
├── poli-link-api
│   ├── config
│       ├── __init__.py
│       ├── __pycache__
│       ├── ...
├── poli-link-db
│       ├── (postgres)
│       ├── ...
├── poli-link-web
│       ├── (nuxt)
│       ├── ...
```


コマンドサンプル

```sh
git add .
git commit -m 'web追加'
git push -u origin main
```

```sh
$ docker exec -it poli-link-api /bin/bash
code# python manage.py runserver
```

```sh
$ docker exec -it poli-link-web sh
/app # cd poli-link/
/app/poli-link # yarn add @nuxtjs/composition-api
```

起動前に
docker-compose build
docker-compose up

起動後は以下で確認
http://localhost:8000/swagger/
http://localhost:8000/api/memo/
http://localhost:8000/admin/polilink_api/memo/
http://localhost:3000/
