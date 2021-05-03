from django.urls import path

from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.index, name='index'),
]

router = routers.DefaultRouter()
router.register(r'memo', views.MemoViewSet)
router.register(r'ministry', views.MinistryViewSet)
router.register(r'council', views.CouncilViewSet)
router.register(r'person', views.PersonViewSet)
router.register(r'council_member', views.CouncilMemberViewSet)
router.register(r'council_meeting', views.CouncilMeetingViewSet)
router.register(r'meeting_speech', views.MeetingSpeechViewSet)
