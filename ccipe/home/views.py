from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import WelcomeHead

# Create your views here.
def index1(request):
    alist=[1,2,3]
    template = loader.get_template('home/index.html')
    context = {
        'alist':alist,
    }
    return HttpResponse(template.render(context,request))
def index(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/index-1.htm')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))
