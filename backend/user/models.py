from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from .manager import UserManager
# Create your models here.

class User(AbstractUser):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(max_length=255, db_index=True, unique=True)
    manage = models.BooleanField(default=False)
    rate = models.CharField(max_length=255, null=True, blank=True)
    msg = models.TextField(null=True, blank=True)
    is_superuser= models.BooleanField(default=False)
    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    # from django.views.generic import DetailView
    # from .models import Department

    # class DepartmentDetailView(DetailView):
    #     model = Department
    #     template_name = "department_detail.html"
    #     context_object_name = "department"

    #     def get_object(self, queryset=None):
    #         endpoint = self.kwargs.get('endpoint')
    #         obj = Department.objects.get(endpoint=endpoint)  # Assuming endpoint is a field in your Department model
    #         return obj
# In this code snippet:

# We are getting the endpoint variable from self.kwargs, where Django stores the captured URL parameters in class-based views.
# Then we are retrieving the Department object that matches the endpoint value from the URL path. You need to replace endpoint=endpoint with the appropriate field lookup based on your Department model.
# This way, the DepartmentDetailView will fetch the correct Department object based on the value of endpoint extracted from the URL path.
# Remember to adjust the field lookup in the get_object method as per your Department model structure to make sure the query works correctly.


   
    






    # @classmethod
    # def create_or_update_subscription(cls, user, subscribed, subscription_id=None):
    #     subscription, created = cls.objects.get_or_create(user=user, defaults={'subscribed': subscribed, 'subscriptionid': subscription_id})
    #     if not created:
    #         subscription.subscribed = subscribed
    #         subscription.subscriptionid = subscription_id
    #         subscription.save()
    #     return subscription
