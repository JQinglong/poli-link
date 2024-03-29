import django_filters
from django_filters import rest_framework
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

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
from .models import CouncilNews
from .serializer import CouncilNewsSerializer

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
    queryset = CouncilMeeting.objects.all()
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    serializer_class = CouncilMeetingSerializer
    filter_fields = ('council', )
    ordering_fields = ['order', 'meeting_date']
    ordering = ['order']

class MeetingSpeechViewSet(viewsets.ModelViewSet):
    queryset = MeetingSpeech.objects.order_by('order')
    serializer_class = MeetingSpeechSerializer
    filter_fields = ('council', 'council_meeting', 'person', 'council__ministry')

class CouncilTreeViewSet(viewsets.ModelViewSet):
    queryset = CouncilTree.objects.order_by('order')
    serializer_class = CouncilTreeSerializer
    filter_fields = ('council', 'parent')

class CouncilNewsViewSet(viewsets.ModelViewSet):
    queryset = CouncilNews.objects.order_by('id')
    serializer_class = CouncilNewsSerializer
    filter_fields = ('council', )

class SpeechFilter(django_filters.FilterSet):

    # フィルタの定義
    speech = django_filters.CharFilter(lookup_expr='contains')
    council = django_filters.ModelMultipleChoiceFilter(label="会義体（複数選択可）", queryset=Council.objects.all(), field_name='council_id',)
    council_meeting = django_filters.ModelMultipleChoiceFilter(label="議事（複数選択可）", queryset=CouncilMeeting.objects.all(), field_name='council_meeting_id',)
    person = django_filters.ModelMultipleChoiceFilter(label="構成員（複数選択可）", queryset=Person.objects.all(), field_name='person_id',)
    council__ministry = django_filters.ModelMultipleChoiceFilter(label="省庁（複数選択可）", queryset=Ministry.objects.all(), field_name='council__ministry',)
    class Meta:
        model = MeetingSpeech
        # フィルタを列挙する。
        # デフォルトの検索方法でいいなら、モデルフィールド名のフィルタを直接定義できる。
        fields = ['council__ministry'] 

class FilterSpeechViewSet(viewsets.ModelViewSet):
    queryset = MeetingSpeech.objects.all()
    serializer_class = MeetingSpeechSerializer
    # フィルタセットの指定
    filter_class = SpeechFilter 
