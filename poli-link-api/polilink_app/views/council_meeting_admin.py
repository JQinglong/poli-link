from django.shortcuts import render
from bs4 import BeautifulSoup
import urllib.request
from django.db.models import Q
from django.views.generic import ListView
from functools import reduce

class SearchMeetingView(ListView):
    template_name = 'polilink_app/council_meeting_admin.html'
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
