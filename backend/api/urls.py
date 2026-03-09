from django.urls import path
from .views import PredictView, HealthView

urlpatterns = [
    path('api/predict/', PredictView.as_view(), name='predict'),
    path('api/health/',  HealthView.as_view(),  name='health'),
]