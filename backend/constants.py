from dotenv import load_dotenv
import os

load_dotenv()

indicators = ["temperature_2m", "relative_humidity_2m", "precipitation"]

cities = list(map(str.lower, os.getenv("CITIES").split(", ")))

print(cities)

dataset_last_info = "2024.01.31"
