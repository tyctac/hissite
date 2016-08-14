from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def index1(request):
    alist=[1,2,3]
    template = loader.get_template('home/index.html')
    context = {
        'alist':alist,
    }
    return HttpResponse(template.render(context,request))
def index(request):
    template = loader.get_template('home/index-1.htm')
    context = {
    }
    return HttpResponse(template.render(request))
