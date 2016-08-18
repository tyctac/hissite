from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import WelcomeHead
from django.core.mail import send_mail

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

def remark(request):
    template = loader.get_template('home/contact.html')
    if request.method == 'POST':
        form = RemarkForm(request.POST) 
        if form.is_valid():
            return HttpResponseRedirect('/home/contact')
    else :
        form = RemarkForm()
    return render_to_response('/home/contact.html')

def submit(request):
    if request.method == 'POST':
        name = request.POST['submitted[your_name]']
        email = request.POST['submitted[your_email_address]']
        subject = request.POST['submitted[your_subject]']
        message = request.POST['submitted[yor_message]']
        flag = send_mail(subject,message,'postmaster@ccipe.net',['wwhat@qq.com'],fail_silently=False)
        template = loader.get_template('home/contact.html')
        context = {
            'flag':flag,
        }
        return HttpResponse(template.render(context,request))        
