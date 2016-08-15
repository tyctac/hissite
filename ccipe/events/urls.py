from django.conf.urls import url
from .import views

app_name = 'events'
urlpatterns = [
    #ex: /home/
    url(r'^$',views.index,name='index'),
]
    

	
