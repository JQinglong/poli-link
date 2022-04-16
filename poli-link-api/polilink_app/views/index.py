from django.shortcuts import render
import urllib.request

def index(request):

  return render(request, 'polilink_app/index.html')