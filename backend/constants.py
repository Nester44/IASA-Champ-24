from dotenv import load_dotenv
import os

load_dotenv()

indicators = ["temperature_2m", "relative_humidity_2m", "precipitation"]

cities = os.getenv("CITIES").split(", ")
