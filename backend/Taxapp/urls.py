from django.urls import path
from . import views

urlpatterns = [
    path("calculate/taxes/", views.CalculateTaxesView.as_view(), name='calculate_taxes'), 
]

#we created the urls.file for better organization of the urls

