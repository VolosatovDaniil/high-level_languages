from django.contrib import admin
from django.urls import path
from currency.views import all_rates, today_rates

urlpatterns = [
    path('admin/', admin.site.urls),
    path('all/', all_rates),
    path('today/', today_rates),
]