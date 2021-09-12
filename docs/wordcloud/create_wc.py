import json
import urllib.request

import tempfile
from janome.tokenizer import Tokenizer
import pandas as pd
import os

folder_name = "./wc"

def main():
  try:
    url = "http://localhost:8000/api/person/"
    res = urllib.request.urlopen(url)
    data = json.loads(res.read().decode('utf-8')) # 実行結果(json)をdata変数に格納

  except urllib.error.HTTPError as e:
     print('HTTPError: ', e)
  except json.JSONDecodeError as e:
     print('JSONDecodeError: ', e)

  for person in data:
    print(person['id']) # idのみ参照

    try:
      url = "http://localhost:8000/api/meeting_speech/"
      params = {
        'person': person['id'],
      }
      req = urllib.request.Request('{}?{}'.format(url, urllib.parse.urlencode(params)))
      # res = urllib.request.urlopen(req)
      with urllib.request.urlopen(req) as res:
        speech_data = json.loads(res.read().decode('utf8'))

    except urllib.error.HTTPError as e:
      print('HTTPError: ', e)
    except json.JSONDecodeError as e:
      print('JSONDecodeError: ', e)

    if len(speech_data) > 0:
      speech = []
      # print(speech_data) 
      for skey in speech_data:
        # print(skey) 
        speech.append(skey['speech'])

      out = gen_wordcloud(speech)

      # with open(folder_name + '/' + person['id'] + '.txt', mode="wb") as f:
      #     f.write(out)

      out.to_json(folder_name + '/' + person['id'] + '.json', orient = 'records', force_ascii=False)

  # with open(folder_name + '/test.txt', mode="w", encoding="utf-8") as f:
  #     f.write(data)

def gen_wordcloud(texts):
    words = []
    for text in texts :
        words.extend(counter(text))

    sr = pd.Series(words)
    counts = sr.value_counts()
    df = pd.DataFrame(counts.rename_axis('name').reset_index(name='value'))
    
    # _, temp_local_filename = tempfile.mkstemp()

    # #with open(temp_local_filename, 'wb') as f:
    # #   pickle.dump(df, f)
        
    # counts.to_csv(temp_local_filename, sep='\t', index=True, header=False)

    # os.remove(temp_local_filename)

    return df

def counter(text):
    if not text:
      return ''
    
    t = Tokenizer()
    words = []

    try:
      tokens = t.tokenize(text)
      for token in tokens:
          #品詞から名詞だけ抽出
          pos = token.part_of_speech.split(',')[0]
          if (pos == '名詞') or (pos == '動詞') or (pos == '形容詞'):
              if token.base_form not in '#, [], する, (), ある, @, これ, こと, よう, いる, なる, さん, いう, ない, おる, れる, の, てる, もの, とこ, 料理, やる, つく, やつ, しまう, できる, それ, くる, とき, いく, せる, ところ, ため, たち, いく, くれる, わけ, 思う, いい, いただく, 行う, ＆':
                words.append(token.base_form)
    except:
      print('error!', text)


    return words


if __name__ == '__main__':
    main()