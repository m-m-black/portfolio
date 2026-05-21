from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Monument
from data_loader import load_monuments

app = FastAPI(title="Monuments API", description="Neolithic monument data")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

monuments: list[Monument] = load_monuments()


@app.get("/monuments", response_model=list[Monument])
def get_monuments():
    return monuments


@app.get("/monuments/{id}", response_model=Monument)
def get_monument(id: str):
    monument = next((m for m in monuments if m.id == id), None)
    if not monument:
        raise HTTPException(status_code=404, detail="Monument not found")
    return monument
