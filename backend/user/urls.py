from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [

    path('register/', views.RegisterView.as_view(), name="register"),
    path('login/', views.LoginAPIView.as_view(), name="login"),

    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('csv/', views.CsvView.as_view(), name="csv_read"),
    path('feedback/', views.FeedbackAPIView.as_view(), name="feedbackapi"),
    path('getestimate/', views.GetestimateView.as_view(), name="getestimate"),
    path('department/<str:endpoint>/', views.DepartmentDetailView.as_view(), name='department_detail'),
    path('eventMark/', views.EventsView.as_view(), name="events_detail"),
    # path('department/<str:endpoint>/', views.DepartmentDetailView.as_view(), name='department_detail'),

    # path('password_reset/', views.forgot, name='password_reset'),
    # path('reset_password/confirm/<uidb64>/<token>/', views.reset_password_confirm, name='reset_password_confirm'),
    # path('confirm_password/', views.confirm_password, name='confirm_password'),

]
