from django.shortcuts import render
from bs4 import BeautifulSoup
import urllib.request
from django.db.models import Q
from django.views.generic import ListView
from functools import reduce

class SearchMemberView(ListView):
    template_name = 'polilink_app/council_member_admin.html'
    context_object_name = 'council_member_list' # オブジェクト名を council_meeting_list に指定

    def get_queryset(self):
        council_id = self.request.GET.get('council_id', '')
        if self.request.GET.get('url', ''):
            url = self.request.GET.get('url', '')
            # スクレイピング
            response = urllib.request.urlopen(url)
            html = response.read()
            soup = BeautifulSoup(html)
            members = []

            print ('council_id:' + council_id)
            print ('url:' + url)

            if council_id == 'a2cced95a4b84bbe8885dd82514045af':
                members = self.member_a2cced95a4b84bbe8885dd82514045af(council_id, soup)
            elif council_id == '':
                members = []
            elif council_id == ' ':
                members = []
            else:
                members = []

            return members
        else:
            return None
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['query'] = self.request.GET.get('q', '')
        return ctx
        
    def parse_search_params(self, words: str):
        search_words = words.replace('　', ' ').split()
        return search_words

    def member_a2cced95a4b84bbe8885dd82514045af(self, council_id, soup):
        meetings = []
        list = soup.find_all('tr')
        # print(list)
        for val in list:
            name = val.td.get_text()
            name_kana = '★かな★'
            # print('td:' + val.td.next_sibling.next_sibling.get_text())
            occupation = val.td.next_sibling.next_sibling.get_text()
            position = val.th.get_text()

            meetings.append({
                'name': name,
                'name_kana': name_kana,
                'occupation': occupation,
                'position': position,
                'council_id': council_id,
            })

        return meetings
