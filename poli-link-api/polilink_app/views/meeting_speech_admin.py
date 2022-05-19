from django.shortcuts import render
from bs4 import BeautifulSoup
import urllib.request
from django.db.models import Q
from django.views.generic import ListView
from functools import reduce
import unicodedata
class SearchSpeechView(ListView):
    template_name = 'polilink_app/meeting_speech_admin.html'
    context_object_name = 'council_meeting_list' # オブジェクト名を council_meeting_list に指定

    def get_queryset(self):
        council_id = self.request.GET.get('council_id', '')
        if self.request.GET.get('url', ''):
            url = self.request.GET.get('url', '')
            # スクレイピング
            response = urllib.request.urlopen(url)
            html = response.read()
            soup = BeautifulSoup(html)
            meetings = []

            print ('council_id:' + council_id)

            if council_id == 'a2cced95a4b84bbe8885dd82514045af':
                meetings = self.meeting_a2cced95a4b84bbe8885dd82514045af(council_id, soup)
            elif council_id == '3d5f4bfb0ef544b7a3864e3d3e69b103':
                meetings = self.meeting_3d5f4bfb0ef544b7a3864e3d3e69b103(council_id, soup)
            elif council_id == '05e7fe5b690f4a3ca8de126153c03b0b':
                meetings = self.meeting_05e7fe5b690f4a3ca8de126153c03b0b(council_id, soup)
            elif council_id == '':
                meetings = []
            elif council_id == ' ':
                meetings = []
            else:
                meetings = []
            # uls = soup.find_all('ul')
            # for ul in uls:
            #     if '議事要旨' in ul.select_one('a').get_text():
            #         meeting_url = 'https://www.mext.go.jp' + ul.select_one('a')['href']
            #         meeting_response = urllib.request.urlopen(meeting_url)
            #         meeting_html = meeting_response.read()
            #         meeting_soup = BeautifulSoup(meeting_html)

            #         name = meeting_soup.find('h1').get_text().replace('議事要旨', '')
            #         place = ''
            #         for h2 in meeting_soup.find_all('h2'):
            #             if h2.get_text() == '2．場所':
            #                 place = h2.next_sibling.next_sibling.get_text()
            #             if h2.get_text() == '1．日時':
            #                 meeting_date = h2.next_sibling.next_sibling.get_text()
            #                 meeting_date = meeting_date[0:(meeting_date.find('日'))].replace('年', '-').replace('月', '-')
            #                 meeting_date = meeting_date.replace('令和元','2019').replace('令和2','2020').replace('令和3','2021').replace('令和4','2022')
                            
            #         order = name[name.find('第') + 1:name.find('回')]

            #         url_document = 'https://www.mext.go.jp' + ul.select('a')[1]['href']

            #         meetings.append({
            #             'name': name,
            #             'place': place,
            #             'order': order,
            #             'meeting_date': meeting_date,
            #             'council_id': council_id,
            #             'url_document': url_document,
            #             'url_minute': meeting_url,
            #         })

            #         # links.append('https://www.mext.go.jp' + ul.select_one('a')['href'])
            return meetings
        else:
            return None
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['query'] = self.request.GET.get('q', '')
        return ctx
        
    def parse_search_params(self, words: str):
        search_words = words.replace('　', ' ').split()
        return search_words

    def meeting_a2cced95a4b84bbe8885dd82514045af(self, council_id, soup):
        meetings = []
        uls = soup.find_all('ul')
        for ul in uls:
            if '議事要旨' in ul.select_one('a').get_text():
                meeting_url = 'https://www.mext.go.jp' + ul.select_one('a')['href']
                meeting_response = urllib.request.urlopen(meeting_url)
                meeting_html = meeting_response.read()
                meeting_soup = BeautifulSoup(meeting_html)

                name = meeting_soup.find('h1').get_text().replace('議事要旨', '')
                place = ''
                for h2 in meeting_soup.find_all('h2'):
                    if h2.get_text() == '2．場所':
                        place = h2.next_sibling.next_sibling.get_text()
                    if h2.get_text() == '1．日時':
                        meeting_date = h2.next_sibling.next_sibling.get_text()
                        meeting_date = meeting_date[0:(meeting_date.find('日'))].replace('年', '-').replace('月', '-')
                        meeting_date = meeting_date.replace('令和元','2019').replace('令和2','2020').replace('令和3','2021').replace('令和4','2022')
                        
                order = name[name.find('第') + 1:name.find('回')]

                url_document = 'https://www.mext.go.jp' + ul.select('a')[1]['href']

                meetings.append({
                    'name': name,
                    'place': place,
                    'order': order,
                    'meeting_date': meeting_date,
                    'council_id': council_id,
                    'url_document': url_document,
                    'url_minute': meeting_url,
                })

                # links.append('https://www.mext.go.jp' + ul.select_one('a')['href'])
        return meetings


    def meeting_3d5f4bfb0ef544b7a3864e3d3e69b103(self, council_id, soup):
        meetings = ['基本的対処方針分科会（令和３年４月）']
        # <h2>基本的対処方針分科会</h2> 以降を参照する
        h2s = soup.find_all('h2')
        for h2 in h2s:
            if '基本的対処方針分科会' in h2.get_text():
                name = ''
                # その次からテーブルを探す
                for sib in h2.next_siblings:
                    if sib.name == 'h2':
                        break

                    if sib.name == 'table':
                        # 各trが各会議
                        for tr in sib:
                            # タグ崩れ等あるのでもう一度確認
                            if tr.name == 'tr':

                                tds = tr.find_all('td')
                                print ('tds:')
                                print (tds)

                                name = '基本的対処方針分科会（' + tds[0].text + '）'

                                order = unicodedata.normalize("NFKC", name[name.find('第') + 1:name.find('回')])
                                meeting_date = tds[1].text
                                meeting_date = meeting_date[0:(meeting_date.find('日'))].replace('年', '-').replace('月', '-')
                                meeting_date = meeting_date.replace('令和元','2019').replace('令和２','2020').replace('令和３','2021').replace('令和４','2022')
                                meeting_date = unicodedata.normalize("NFKC", meeting_date)
                                url_document = 'https://www.cas.go.jp/jp/seisaku/ful/' + tds[2].select_one('a')['href']
                                url_minute = 'https://www.cas.go.jp/jp/seisaku/ful/' + tds[3].select_one('a')['href']


                                # meeting_response = urllib.request.urlopen(url_minute)
                                # meeting_html = meeting_response.read()
                                # meeting_soup = BeautifulSoup(meeting_html)
                                # print(meeting_soup)
                                # 取れてるけど文字化け

                                # name = meeting_soup.find('h1').get_text().replace('議事要旨', '')
                                # place = ''
                                # for h2 in meeting_soup.find_all('h2'):
                                #     if h2.get_text() == '2．場所':
                                #         place = h2.next_sibling.next_sibling.get_text()
                                #     if h2.get_text() == '1．日時':
                                #         meeting_date = h2.next_sibling.next_sibling.get_text()
                                #         meeting_date = meeting_date[0:(meeting_date.find('日'))].replace('年', '-').replace('月', '-')
                                #         meeting_date = meeting_date.replace('令和元','2019').replace('令和2','2020').replace('令和3','2021').replace('令和4','2022')
                                        
                                place = ''

                                meetings.append({
                                    'name': name,
                                    'place': place,
                                    'order': order,
                                    'meeting_date': meeting_date,
                                    'council_id': council_id,
                                    'url_document': url_document,
                                    'url_minute': url_minute,
                                })

                # links.append('https://www.mext.go.jp' + ul.select_one('a')['href'])
        return meetings

    def meeting_05e7fe5b690f4a3ca8de126153c03b0b(self, council_id, soup):
        meetings = ['新型コロナウイルス感染症対策分科会（令和３年４月）']
        # <h2>基本的対処方針分科会</h2> 以降を参照する
        h2s = soup.find_all('h2')
        for h2 in h2s:
            if '新型コロナウイルス感染症対策分科会' in h2.get_text():
                name = ''
                # その次からテーブルを探す
                for sib in h2.next_siblings:
                    if sib.name == 'h2':
                        break

                    if sib.name == 'table':
                        # 各trが各会議
                        for tr in sib:
                            # タグ崩れ等あるのでもう一度確認
                            if tr.name == 'tr':

                                tds = tr.find_all('td')
                                print ('tds:')
                                print (tds)

                                if tds[0].text == '':
                                    continue

                                name = '新型コロナウイルス感染症対策分科会（' + tds[0].text + '）'

                                order = unicodedata.normalize("NFKC", name[name.find('第') + 1:name.find('回')])
                                meeting_date = tds[1].text
                                meeting_date = meeting_date[0:(meeting_date.find('日'))].replace('年', '-').replace('月', '-')
                                meeting_date = meeting_date.replace('令和元','2019').replace('令和２','2020').replace('令和３','2021').replace('令和４','2022')
                                meeting_date = unicodedata.normalize("NFKC", meeting_date)
                                url_document = 'https://www.cas.go.jp/jp/seisaku/ful/' + tds[2].select_one('a')['href']
                                url_minute = ''
                                if tds[3].select_one('a'):
                                    url_minute = 'https://www.cas.go.jp/jp/seisaku/ful/' + tds[3].select_one('a')['href']
    
                                place = ''

                                meetings.append({
                                    'name': name,
                                    'place': place,
                                    'order': order,
                                    'meeting_date': meeting_date,
                                    'council_id': council_id,
                                    'url_document': url_document,
                                    'url_minute': url_minute,
                                })

                # links.append('https://www.mext.go.jp' + ul.select_one('a')['href'])
        return meetings
