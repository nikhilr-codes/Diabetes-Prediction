from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        # Load pickle files into memory when Django starts
        from .ml.model_loader import load_model
        load_model()
