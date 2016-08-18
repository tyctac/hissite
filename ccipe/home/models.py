from __future__ import unicode_literals
from django import forms

from django.db import models

# Create your models here.

class Question(models.Model):
    questions_text = models.CharField(max_length=200)
    pubdate = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

class WelcomeHead(models.Model):
    welcome_head_text = models.CharField(max_length=200)
    test = models.TextField(default=False)    

class RemarkForm(forms.Form):
    name = forms.CharField(max_length=50)
    mail = forms.EmailField()
    subject = forms.CharField(max_length=200)
    message = forms.CharField(max_length=1000)
