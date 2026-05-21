import json
from pathlib import Path
from models import Monument


def load_monuments() -> list[Monument]:
    path = Path(__file__).parent / "data" / "monuments.json"
    with open(path) as f:
        data = json.load(f)
    return [Monument(**m) for m in data]
