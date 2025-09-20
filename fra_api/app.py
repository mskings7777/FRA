from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random
from faker import Faker

app = FastAPI()

# ----------------- CORS -----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data generation -----------------
faker = Faker("en_IN")
df = pd.DataFrame()

@app.on_event("startup")
def generate_data():
    global df
    records = []
    for i in range(1000):
        records.append({
            "Patta_ID": f"IFR-{i+1:05d}",
            "Holder_Name": faker.name(),
            "State": faker.state(),
            "District": faker.city(),
            "Village": faker.word(),
            "Latitude": float(faker.latitude()),
            "Longitude": float(faker.longitude()),
            "Verification_Status": random.choice(["Approved", "Pending", "Rejected"]),
            "Priority": random.choice(["High", "Medium", "Low"]),
            "Scheme": random.choice(["A", "B", "C"])
        })
    df = pd.DataFrame(records)
    print("✅ FRA dataset generated with", len(df), "records")

# ----------------- API endpoints -----------------
@app.get("/filters")
def get_filters():
    if df.empty:
        return {"states": [], "districts": [], "villages": []}
    return {
        "states": sorted(df["State"].unique().tolist()),
        "districts": sorted(df["District"].unique().tolist()),
        "villages": sorted(df["Village"].unique().tolist())
    }

@app.get("/fra-data")
def get_fra_data(state: str = "All", district: str = "All", village: str = "All"):
    filtered = df.copy()
    if state != "All":
        filtered = filtered[filtered["State"] == state]
    if district != "All":
        filtered = filtered[filtered["District"] == district]
    if village != "All":
        filtered = filtered[filtered["Village"] == village]
    return filtered.head(100).to_dict(orient="records")
