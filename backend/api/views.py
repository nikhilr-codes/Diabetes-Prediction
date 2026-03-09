from django.shortcuts import render

# Create your views here.
"""
views.py
--------
GET  /api/health/   → check if Django + model are running
POST /api/predict/  → send values, get diabetes prediction
"""

from rest_framework.views    import APIView
from rest_framework.response import Response
from rest_framework.parsers  import JSONParser

from .ml.model_loader import get_model, get_features, is_ready, is_mock

# These 6 features — no BloodPressure, no SkinThickness
FEATURES = [
    'Pregnancies',
    'Glucose',
    'Insulin',
    'BMI',
    'DiabetesPedigreeFunction',
    'Age',
]


# ─────────────────────────────────────
# GET /api/health/
# ─────────────────────────────────────
class HealthView(APIView):

    def get(self, request):
        if is_ready():
            return Response({
                'status':   'ok',
                'model':    type(get_model()).__name__,
                'features': get_features(),
                'message':  'Django is running and model is loaded ✅',
            })
        return Response({
            'status':  'no_model',
            'message': 'Django running but pkl files not found in api/ml/ ⚠️',
        }, status=503)


# ─────────────────────────────────────
# POST /api/predict/
# ─────────────────────────────────────
class PredictView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):

        # 1. Check model is loaded
        if not is_ready():
            return Response(
                {'error': 'Model not loaded. Check dibetes.pkl and feature_column.pkl in api/ml/'},
                status=503
            )

        data     = request.data
        features = get_features()  # get feature list from pkl

        # Use features from pkl file if available, else use default
        feature_list = list(features) if features is not None else FEATURES

        # 2. Check all fields are present
        # Use FEATURES from views.py if pkl features look like indices
        feature_list = feature_list if all(isinstance(f, str) for f in feature_list) else FEATURES

        missing = [f for f in feature_list if f not in data]
        if missing:
            return Response(
                {'error': f'Missing fields: {missing}', 'required': feature_list},
                status=400
            )

        # 3. Convert to float
        try:
            values = [[float(data[f]) for f in feature_list]]
        except (ValueError, TypeError):
            return Response(
                {'error': 'All values must be numbers'},
                status=400
            )

        # 4. Predict directly (no scaler — using feature_column.pkl)
        try:
            model      = get_model()
            prediction = int(model.predict(values)[0])
            proba      = model.predict_proba(values)[0]
        except Exception as e:
            return Response({'error': f'Prediction failed: {str(e)}'}, status=500)

        # 5. Return result
        return Response({
            'prediction': prediction,
            'label':      'Diabetic' if prediction == 1 else 'Healthy',
            'confidence': f"{max(proba) * 100:.1f}%",
            'probability': {
                'healthy':  round(float(proba[0]) * 100, 1),
                'diabetic': round(float(proba[1]) * 100, 1),
            },
            'is_simulated': is_mock()
        })