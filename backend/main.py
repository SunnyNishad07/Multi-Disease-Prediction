import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import RootModel,field_validator 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#Cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://localhost:5173"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

#validation classess
class diabeteshInput(RootModel[list[float]]):
    @field_validator("root")
    @classmethod
    def validate_data(cls,data):
        if len(data) != 8:
            raise ValueError("Diabetes prediction requries exactly 8 features.")
        return data 

class heartInput(RootModel[list[float]]):
    @field_validator("root")
    @classmethod
    def validate_data(cls,data):
        if len(data) != 13:
            raise ValueError("Heart disease prediction requries exactly 13 features.")
        return data

class parkinsonsInput(RootModel[list[float]]):
    @field_validator("root")
    @classmethod
    def validate_data(cls,data):
        if len(data) != 22:
            raise ValueError("Parkinsons prediction requries exactly 22 features.")
        return data

# load diabetes model
diabetes_model = pickle.load(
    open("models/diabetes_model.sav", "rb")
)

# load heart model
heart_disease_model = pickle.load(
    open("models/heart_disease_model.sav", "rb")
)

#load parkinson model
parkinsons_model = pickle.load(
    open("models/parkinsons_model.sav",
    "rb")
)

@app.get("/")
def home():
    return {"message": "Multi Disease Prediction API is running"}

#Diabetes Function(endpoint)
@app.post("/prediction/diabetes")
def predict_diabetes(data: diabeteshInput):
    try:
        input_data = np.asarray(data.root)

        input_data = input_data.reshape(1, -1)

        prediction = diabetes_model.predict(input_data)

        if prediction[0] == 1:
            result = "Diabetic"
        else:
            result = "Not Diabetic"

        return {
        "prediction": int(prediction[0]),
        "result": result
        }
    except Exception:
            raise HTTPException(
                status_code=500,
                detail="Diabetes prediction failed. Please try again."
            )

#Heart Function(endpoint)
@app.post("/prediction/heart")
def predict_heart(data: heartInput):
    try:
        input_data = np.asarray(data.root)

        input_data = input_data.reshape(1, -1)

        prediction = heart_disease_model.predict(input_data)

        if prediction[0] == 1:
            result = "Heart Disease"
        else:
            result = "Not Heart Disease"

        return {
            "prediction": int(prediction[0]),
            "result": result
        }
    except Exception:
            raise HTTPException(
                status_code=500,
                detail="Heart disease prediction failed. Please try again."
            )

#Parkinsons Function(endpoint)
@app.post("/prediction/parkinsons")
def predict_parkinsons(data: parkinsonsInput):
    try:
        input_data = np.asarray(data.root)

        input_data = input_data.reshape(1,-1)

        prediction = parkinsons_model.predict(input_data)
        if prediction[0] == 1:
            result = "Parkinsons Disease"
        else:
            result = "Not Parkinsons Disease"
        return{
            "prediction":int(prediction[0]),
            "result":result
        }
    except Exception:
            raise HTTPException(
                status_code=500,
                detail="Parkinsons prediction failed. Please try again."
            )