from django.db import models

class ExchangeRate(models.Model):
    name = models.CharField(max_length=50) 
    buy_rate = models.DecimalField(max_digits=10, decimal_places=2)
    sell_rate = models.DecimalField(max_digits=10, decimal_places=2)
    date_added = models.DateField(auto_now_add=True) 

    def __str__(self):
        return self.name