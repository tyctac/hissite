# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-15 13:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_welcomehead'),
    ]

    operations = [
        migrations.RenameField(
            model_name='welcomehead',
            old_name='choice_text',
            new_name='welcome_head_text',
        ),
    ]