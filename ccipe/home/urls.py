from django.conf.urls import url
from .import views

app_name = 'home'
urlpatterns = [
    #ex: /home/
    url(r'^$',views.index,name='index'),
    url(r'^index',views.index,name='index'),
    url(r'^aboutus',views.aboutus,name='aboutus'),
    url(r'^events',views.events,name='events'),
    url(r'^programs',views.programs,name='programs'),
    url(r'^workwithus',views.workwithus,name='workwithus'),
    url(r'^contact',views.contact,name='contact'),
    url(r'^submit',views.submit,name='submit'),
]
