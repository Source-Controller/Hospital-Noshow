from django.contrib import admin
from user.models import User
# Register your models here.


class YourModelAdmin(admin.ModelAdmin):
    list_display = ('username', 'id', 'email', "manage",'rate', 'msg')


admin.site.register(User, YourModelAdmin)
