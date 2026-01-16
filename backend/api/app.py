from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import init_db
import os

app = FastAPI(title="C-Planning Dashboard API")

# Obtener orígenes permitidos desde variable de entorno
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5174").split(",")

# CORS para permitir requests desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/health")
def health_check():
    return {"status": "ok"}
