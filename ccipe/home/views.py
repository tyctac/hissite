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
def index2(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/index-1.htm')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))

def index(request):
    x = WelcomeHead.objects.all()
    if x != None and len(x) > 0 :
        welcome = WelcomeHead.objects.all()[0]
    else: welcome = None
    template = loader.get_template('home/index-1.htm')
    context = {
        'welcome':welcome,
    }
    return HttpResponse(template.render(context,request))

def aboutus(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/aboutus.html')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))

def events(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/events.html')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))

def programs(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/programs.html')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))

def workwithus(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/workwithus.html')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))

def contact(request):
#    welcomehead = WelcomeHead.objects.all()[0]
    welcome_head_list = WelcomeHead.objects.all()
    template = loader.get_template('home/contact.html')
    context = {
        'welcome_head_list':welcome_head_list,
    }
    return HttpResponse(template.render(context,request))


