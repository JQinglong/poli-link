
政治がどう決まっていくのか

会議体
　主査
　会長
　構成員
　　人マスタ
　　　所属履歴
　　　SNS
　　　書籍
　お金
　これらの履歴
　議事録

オリンピック組織委員会
新型コロナ

https://www.cas.go.jp/jp/seisaku/ful/yusikisyakaigi.html
https://www.cas.go.jp/jp/seisaku/ful/pdf/meibo-corona.pdf
石田 昭浩 日本労働組合総連合会副事務局長
今村 顕史 東京都立駒込病院感染症センター長、感染症科部長
大竹 文雄 大阪大学大学院経済学研究科教授
岡部 信彦 川崎市健康安全研究所長
押谷 仁 東北大学大学院医学系研究科微生物学分野教授
◎ 尾身 茂 独立行政法人地域医療機能推進機構理事長
釜萢 敏 公益社団法人日本医師会常任理事
幸本 智彦 東京商工会議所議員
小林慶一郎 公益財団法人東京財団政策研究所研究主幹
舘田 一博 東邦大学微生物・感染症学講座教授
中山ひとみ 霞が関総合法律事務所弁護士
平井 伸治 鳥取県知事
南 砂 読売新聞東京本社常務取締役 調査研究本部長
武藤 香織 東京大学医科学研究所公共政策研究分野教授
○ 脇田 隆字 国立感染症研究所所長
【臨時構成員】
磯部 哲 慶應義塾大学法科大学院教授
太田 圭洋 一般社団法人日本医療法人協会副会長
河本 宏子 ANA 総合研究所会長
清古 愛弓 全国保健所長会副会長
◎：分科会長 ○：分科会長代理


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


構成複雑なので、Docker使う

Django + REST framework + Swagger + JWT + docker-compose で開発環境構築
https://qiita.com/mykysyk@github/items/fef6fb298393a029a5d4

基本はこれに従うが、これはPythonだけ
DBも作成するので、大きな構成は下記

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

Macにpipenvをインストールするまでのメモ
https://qiita.com/kapibara-3/items/c4acf09c8b61e43699ab

```sh
brew update

# エラー対処
sudo rm /usr/local/share/Library/Caches/Yarn/v6/npm-micromatch-3.1.10-70859bc95c9840952f359a068a3fc49f9ecfac23-integrity/node_modules/micromatch/lib/.DS_Store
sudo rm /usr/local/share/Library/Caches/Yarn/v6/npm-ws-3.3.3-f1cf84fe2d5e901ebce94efaece785f187a228f2-integrity/node_modules/ws/lib/.DS_Store

sudo find /usr/local/share/Library/Caches/Yarn/v6 -type f -name ".DS_Store" -print | xargs sudo rm -f

brew install pyenv
pyenv install --list

# 3.8.1が出てこないので
brew upgrade pyenv
pyenv install --list
sudo pyenv install 3.8.1
```

error: implicit declaration of function 'sendfile' is invalid

https://teratail.com/questions/309663

```sh
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
brew reinstall zlib bzip2
==> Downloading https://homebrew.bintray.com/bottles/zlib-1.2.11.big_sur.bottle.tar.gz
######################################################################## 100.0%
==> Reinstalling zlib 
==> Pouring zlib-1.2.11.big_sur.bottle.tar.gz
==> Caveats
zlib is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find zlib you may need to set:
  export LDFLAGS="-L/usr/local/opt/zlib/lib"
  export CPPFLAGS="-I/usr/local/opt/zlib/include"

For pkg-config to find zlib you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/zlib/lib/pkgconfig"

==> Summary
🍺  /usr/local/Cellar/zlib/1.2.11: 12 files, 413.4KB
==> Downloading https://homebrew.bintray.com/bottles/bzip2-1.0.8.big_sur.bottle.1.tar.gz
######################################################################## 100.0%
==> Reinstalling bzip2 
==> Pouring bzip2-1.0.8.big_sur.bottle.1.tar.gz
==> Caveats
bzip2 is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have bzip2 first in your PATH, run:
  echo 'export PATH="/usr/local/opt/bzip2/bin:$PATH"' >> /Users/konnokiyotaka/.bash_profile

For compilers to find bzip2 you may need to set:
  export LDFLAGS="-L/usr/local/opt/bzip2/lib"
  export CPPFLAGS="-I/usr/local/opt/bzip2/include"

==> Summary
🍺  /usr/local/Cellar/bzip2/1.0.8: 26 files, 532.7KB
==> Caveats
==> zlib
zlib is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find zlib you may need to set:
  export LDFLAGS="-L/usr/local/opt/zlib/lib"
  export CPPFLAGS="-I/usr/local/opt/zlib/include"

For pkg-config to find zlib you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/zlib/lib/pkgconfig"

==> bzip2
bzip2 is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have bzip2 first in your PATH, run:
  echo 'export PATH="/usr/local/opt/bzip2/bin:$PATH"' >> /Users/konnokiyotaka/.bash_profile

For compilers to find bzip2 you may need to set:
  export LDFLAGS="-L/usr/local/opt/bzip2/lib"
  export CPPFLAGS="-I/usr/local/opt/bzip2/include"
```

メッセージに従って
```sh
export LDFLAGS="-L/usr/local/opt/zlib/lib"
export CPPFLAGS="-I/usr/local/opt/zlib/include"
export PKG_CONFIG_PATH="/usr/local/opt/zlib/lib/pkgconfig"
echo 'export PATH="/usr/local/opt/bzip2/bin:$PATH"' >> /Users/konnokiyotaka/.bash_profile
export LDFLAGS="-L/usr/local/opt/bzip2/lib"
export CPPFLAGS="-I/usr/local/opt/bzip2/include"

#さらに
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
source ~/.bash_profile

#https://teratail.com/questions/309549
brew install pyenv zlib bzip2 readline
CPPFLAGS="-I$(brew --prefix openssl)/include -I$(brew --prefix bzip2)/include -I$(brew --prefix readline)/include -I$(brew --prefix zlib)/include" LDFLAGS="-L$(brew --prefix openssl)/lib -L$(brew --prefix readline)/lib -L$(brew --prefix zlib)/lib -L$(brew --prefix bzip2)/lib" pyenv install 3.8.6

```
OK

```sh
$ pyenv versions
  system
* 3.7.2 (set by ...
  3.8.6
$ pyenv global 3.8.6
$ pyenv versions
  system
  3.7.2
* 3.8.6 (set by ...
$ python -V
Python 3.8.6
$ pip install --upgrade pip
$ pip install pipenv
$ pipenv --version
pipenv, version 2020.11.15
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
```

https://zenn.dev/dsonoda/articles/dbe14ca8af617ed85b1f#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97
も参考
```sh
$ mkdir poli-link-api && cd poli-link-api
$ pipenv --python 3.8
$ ls
Pipfile
```
gunicornは使わない
psycopg2-binaryもはPostgresように必要
```sh
$ pipenv shell
(poli-link-api)$ pipenv install django psycopg2-binary

✘ Locking Failed! 
ERROR:pip.subprocessor:Command errored out with exit status 1:
 command: /Users/konnokiyotaka/.local/share/virtualenvs/poli-link-api-bZXAEGet/bin/python -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/setup.py'"'"'; __file__='"'"'/private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info
     cwd: /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/
Complete output (23 lines):
running egg_info
creating /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info/psycopg2_binary.egg-info
writing /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info/psycopg2_binary.egg-info/PKG-INFO
writing dependency_links to /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info/psycopg2_binary.egg-info/dependency_links.txt
writing top-level names to /private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info/psycopg2_binary.egg-info/top_level.txt
writing manifest file '/private/var/folders/5n/wvqfj5md2xj_nbk0dnxy6wrm0000gn/T/pip-resolver-bj7wxzyi/psycopg2-binary/pip-egg-info/psycopg2_binary.egg-info/SOURCES.txt'

Error: pg_config executable not found.

pg_config is required to build psycopg2 from source.  Please add the directory
containing pg_config to the $PATH or specify the full executable path with the
option:
```

埒が明かない
django のdockerイメージはないのか

Docker-docs-ja
https://docs.docker.jp/compose/django.html


```yml:docker-compose.yml
version: '3'

services:
  db:
    container_name: poli-link-db
    image: postgres
  api:
    container_name: poli-link-api
    build: ./poli-link-api
    command: python3 manage.py runserver 0.0.0.0:8000
    volumes:
      - ./poli-link-api/:/code
    ports:
      - "8000:8000"
    depends_on:
      - db


```

poli-link-api ディレクトリ作成

```Dockerfile
FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /code/
```

requirements.txt 作成
```txt:requirements.txt
certifi==2020.4.5.1
chardet==3.0.4
coreapi==2.3.3
coreschema==0.0.4
Django==2.2.12
django-filter==2.2.0
django-rest-swagger==2.2.0
djangorestframework==3.11.0
djangorestframework-jwt==1.11.0
idna==2.9
itypes==1.1.0
Jinja2==2.11.2
MarkupSafe==1.1.1
openapi-codec==1.3.2
PyJWT==1.7.1
pytz==2019.3
requests==2.23.0
simplejson==3.17.0
sqlparse==0.3.1
uritemplate==3.0.1
urllib3==1.25.9
mysqlclient==1.4.6
```
psycopg2 を入れるとエラー
mysqlにしてみる


Django プロジェクトの生成

```sh
docker-compose run api django-admin.py startproject config .
```

```py:settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'polilink_database',
        'USER': 'root',
        'HOST': 'db',
        'PORT': 3306,
    }
}
```

```sh
docker-compose ps
docker-compose up
```
やはりエラー
django.core.exceptions.ImproperlyConfigured: Error loading psycopg2 module: No module named 'psycopg2'



```sh
docker-compose exec poli-link-api pipenv install psycopg2-binary
docker-compose up --build
```
docker-compose up --build　が必要だった？
http://localhost:8000/
見えた

これを初期ソースとする

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:JQinglong/poli-link.git
git push -u origin main
```


```sh
```


```sh
```
