# 手順
a2cced95a4b84bbe8885dd82514045af
教育データの利活用に関する有識者会議

1. 議事録の本文部分を、text.txt に貼り付ける。

2. replacer.pyのID変更
   
3. python replacer.py を実行
cd docs/replacer
python replacer_a2cced95a4b84bbe8885dd82514045af.py

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
'〇'をcommand+D（を連続して）で全選択
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
