# 手順

1. 議事録の本文部分を、text.txt に貼り付ける。

<!-- スクリプトで対応した
2. ページやフッタを削除する

例（下記の「3」の行を削除）

```
皆様にわかりやすく説明できて、かつ、それが御納得いただけることが非常に重要だと考
3
えております。
``` -->

3. replacer.pyのID変更
   
4. python replacer.py を実行

python replacer.py

5. 6行目削除
例

```
, 'a963c26aaa934abfaef70d2cc929e3fb', '24a8de612cfc495f91922b89f454c696'),
```

6. 最終行に下記追記

置換後のテキストからコピーして、最後だけ、「,」→「;」

```
, ''
, 'a963c26aaa934abfaef70d2cc929e3fb', '24a8de612cfc495f91922b89f454c696');
```

7. 連番処理

VSCodeで
'〇'をcommand+Dで全選択
command+alt+N
%d:1:1


8. SQL実行
   
-- 2021-08-31 08:09:47.9250
-- Can't log this query because it's too big!
となった場合は

```
INSERT INTO `polilink_api_meetingspeech` (`id`, `order`,
 `speaker`,
 `speech`,
 `description`, `council_id`, `council_meeting_id`)
 VALUES
 ```

 を途中に挟むなど
