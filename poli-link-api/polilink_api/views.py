import django_filters

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, filters
from .models import Memo
from .models import Ministry
from .serializer import MemoSerializer
from .serializer import MinistrySerializer

def index(request):
    return HttpResponse("Hello, world.")

class MemoViewSet(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

class MinistryViewSet(viewsets.ModelViewSet):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer
