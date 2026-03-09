"""
model_loader.py
---------------
Loads your exact pkl files:
  backend/api/ml/dibetes.pkl
  backend/api/ml/feature_column.pkl
"""

import os
import pickle

BASE         = os.path.dirname(__file__)
MODEL_PATH   = os.path.join(BASE, 'dibetes.pkl')         # your model file
FEATURE_PATH = os.path.join(BASE, 'feature_column.pkl')  # your features file

# Global — loaded once, reused on every request
_model    = None
_features = None
_is_mock  = False


def load_model():
    global _model, _features

    # Load dibetes.pkl
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                _model = pickle.load(f)
            print("✅ dibetes.pkl loaded")
        except Exception as e:
            print(f"❌ dibetes.pkl failed: {e}")
            print("⚠️ Using fallback Mock Model for development")
            _is_mock = True
            _model = MockModel()
    else:
        print("⚠️ dibetes.pkl not found in api/ml/")
        _is_mock = True
        _model = MockModel()

    # Load feature_column.pkl
    if os.path.exists(FEATURE_PATH):
        try:
            with open(FEATURE_PATH, 'rb') as f:
                _features = pickle.load(f)
            print(f"✅ feature_column.pkl loaded → {_features}")
        except Exception as e:
            print(f"❌ feature_column.pkl failed: {e}")
            _features = ["Pregnancies", "Glucose", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]
    else:
        print("⚠️ feature_column.pkl not found in api/ml/")
        _features = ["Pregnancies", "Glucose", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]

class MockModel:
    def predict(self, X):
        import numpy as np
        # Simple heuristic based on Glucose (index 1)
        glucose = X[0][1]
        return [1 if glucose > 140 else 0]

    def predict_proba(self, X):
        import numpy as np
        glucose = X[0][1]
        prob = min(max(glucose / 200, 0.1), 0.9)
        return np.array([[1-prob, prob]])


def get_model():
    return _model

def get_features():
    return _features

def is_ready():
    return _model is not None

def is_mock():
    return _is_mock