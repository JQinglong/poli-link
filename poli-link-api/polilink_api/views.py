import django_filters

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, filters
from .models import Memo
from .serializer import MemoSerializer
from .models import Ministry
from .serializer import MinistrySerializer
from .models import Council
from .serializer import CouncilSerializer
from .models import Person
from .serializer import PersonSerializer
from .models import CouncilMember
from .serializer import CouncilMemberSerializer
from .models import CouncilMeeting
from .serializer import CouncilMeetingSerializer
from .models import MeetingSpeech
from .serializer import MeetingSpeechSerializer
from .models import CouncilTree
from .serializer import CouncilTreeSerializer

def index(request):
    return HttpResponse("Hello, world.")

class MemoViewSet(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

class MinistryViewSet(viewsets.ModelViewSet):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer

class CouncilViewSet(viewsets.ModelViewSet):
    queryset = Council.objects.all()
    serializer_class = CouncilSerializer
    filter_fields = ('ministry', )

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.order_by('name_kana')
    serializer_class = PersonSerializer

class CouncilMemberViewSet(viewsets.ModelViewSet):
    queryset = CouncilMember.objects.order_by('name')
    serializer_class = CouncilMemberSerializer
    filter_fields = ('council', 'person', )

class CouncilMeetingViewSet(viewsets.ModelViewSet):
    queryset = CouncilMeeting.objects.order_by('order')
    serializer_class = CouncilMeetingSerializer
    filter_fields = ('council', )

class MeetingSpeechViewSet(viewsets.ModelViewSet):
    queryset = MeetingSpeech.objects.order_by('order')
    serializer_class = MeetingSpeechSerializer
    filter_fields = ('council', 'council_meeting', 'person')

class CouncilTreeViewSet(viewsets.ModelViewSet):
    queryset = CouncilTree.objects.order_by('order')
    serializer_class = CouncilTreeSerializer
    filter_fields = ('council', 'parent')
