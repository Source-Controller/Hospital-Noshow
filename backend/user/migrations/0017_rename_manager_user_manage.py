# Generated by Django 4.2.8 on 2024-02-16 15:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0016_remove_user_city_remove_user_companyname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='manager',
            new_name='manage',
        ),
    ]
