from django.urls import path
from . import views

app_name = 'polilink_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('council_news_admin', views.council_news_admin, name='council_news_admin'),
    # path('council_meeting_admin', views.council_meeting_admin, name='council_meeting_admin'),
    path('council_meeting_admin', views.SearchMeetingView.as_view(), name='council_meeting_admin'),
]