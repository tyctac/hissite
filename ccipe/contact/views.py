from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


# Create your views here.
def index(request):
    template = loader.get_template('contact/contact.html')
    context = {
    }
    return HttpResponse(template.render(request))
