from django.shortcuts import render
from bs4 import BeautifulSoup
import urllib.request
from django.views.generic import TemplateView

def council_news_admin(request):


    # # ★会議体ID
    # council_id='a2cced95a4b84bbe8885dd82514045af'

    # # ★対象サイトのURL
    # url = "https://youtu.be/T4z3zdJLJ-c"
  council_id = request.GET.get('council_id', '')
  url = request.GET.get('url', '')

  if url:

    # スクレイピング
    response = urllib.request.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html)
    # # 全てのaタグを抽出
    # links = soup.find_all('a')
    og_description = soup.find('meta', attrs={'property': 'og:description', 'content': True})
    if og_description is not None:
        description = og_description['content']
    else:
        description = ''

    og_img = soup.find('meta', attrs={'property': 'og:image', 'content': True})
    if og_img is not None:
        image = og_img['content']
    else:
        image = ''
    
    og_site_name = soup.find('meta', attrs={'property': 'og:site_name', 'content': True})
    if og_site_name is not None:
        site_name = og_site_name['content']
    else:
        site_name = ''
    
    og_title = soup.find('meta', attrs={'property': 'og:title', 'content': True})
    if og_title is not None:
        title = og_title['content']
    else:
        title = ''


    # テンプレートに渡すデータを格納 
    context = {
        'url': url,
        'council_id': council_id,
        'description': description,
        'image': image,
        'site_name': site_name,
        'title': title,
    }

  else:
      context = {}

  return render(request, 'polilink_app/council_news_admin.html', context)

# class NewsOgp(TemplateView):
#     template_name = 'polilink_app/council_meeting_admin.html'
#     context_object_name = 'council_meeting_list'

#     def get_context_data(self, **kwargs):

#         council_id = self.request.GET.get('council_id', '')
#         url = self.request.GET.get('url', '')

#         response = urllib.request.urlopen(url)
#         html = response.read()
#         soup = BeautifulSoup(html)
#         # # 全てのaタグを抽出
#         # links = soup.find_all('a')
#         og_description = soup.find('meta', attrs={'property': 'og:description', 'content': True})
#         if og_description is not None:
#             description = og_description['content']
#         else:
#             description = ''

#         og_img = soup.find('meta', attrs={'property': 'og:image', 'content': True})
#         if og_img is not None:
#             image = og_img['content']
#         else:
#             image = ''
        
#         og_site_name = soup.find('meta', attrs={'property': 'og:site_name', 'content': True})
#         if og_site_name is not None:
#             site_name = og_site_name['content']
#         else:
#             site_name = ''
        
#         og_title = soup.find('meta', attrs={'property': 'og:title', 'content': True})
#         if og_title is not None:
#             title = og_title['content']
#         else:
#             title = ''


#         ctx = super().get_context_data(**kwargs)
#         # テンプレートに渡すデータを格納 
#         ctx['ogp'] = {
#             'url': url,
#             'council_id': council_id,
#             'description': description,
#             'image': image,
#             'site_name': site_name,
#             'title': title,
#         }

#         return ctx
