# Generated by Django 2.0.3 on 2018-03-30 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolistitem',
            name='contact',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='todolistitem',
            name='photo',
            field=models.TextField(blank=True, null=True),
        ),
    ]
