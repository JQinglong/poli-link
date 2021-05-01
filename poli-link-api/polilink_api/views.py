import django_filters

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, filters
from .models import Memo
from .models import Ministry
from .models import Council
from .models import Person
from .serializer import MemoSerializer
from .serializer import MinistrySerializer
from .serializer import CouncilSerializer
from .serializer import PersonSerializer

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

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
