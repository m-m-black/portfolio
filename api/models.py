from typing import Literal, Optional
from pydantic import BaseModel

AlignmentEvent = Literal[
    "midsummer_sunrise",
    "midsummer_sunset",
    "midwinter_sunrise",
    "midwinter_sunset",
    "equinox_sunrise",
    "equinox_sunset",
    "lunar_major_standstill",
    "lunar_minor_standstill",
]

AlignmentConfidence = Literal["confirmed", "probable", "proposed"]

MonumentType = Literal["stone_circle", "dolmen", "passage_tomb", "alignment", "henge"]


class Alignment(BaseModel):
    event: AlignmentEvent
    confidence: AlignmentConfidence


class Monument(BaseModel):
    id: str
    name: str
    country: str
    region: str
    type: MonumentType
    lat: float
    lng: float
    stone_count: Optional[int] = None
    diameter_m: Optional[float] = None
    age_bp: Optional[int] = None
    alignments: list[Alignment] = []
