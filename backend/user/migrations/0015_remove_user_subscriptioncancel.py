# Generated by Django 4.2.9 on 2024-01-31 01:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0014_alter_user_email_alter_user_subscriptioncancel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='subscriptioncancel',
        ),
    ]