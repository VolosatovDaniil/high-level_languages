from django.shortcuts import render
from .models import ExchangeRate
from datetime import date

def all_rates(request):
    rates = ExchangeRate.objects.all()
    return render(request, 'rates.html', {'rates': rates, 'title': 'Всі курси'})

def today_rates(request):
    rates = ExchangeRate.objects.filter(date_added=date.today())
    return render(request, 'rates.html', {'rates': rates, 'title': 'Курси за сьогодні'})