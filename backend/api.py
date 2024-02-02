import openmeteo_requests
import pandas as pd
import requests_cache
from retry_requests import retry
import os

ninjas_api_key = os.environ.get("API_NINJAS_KEY")


def get_coordinates(city):
    api_url = f"https://api.api-ninjas.com/v1/geocoding?city={city}"
    headers = {"X-Api-Key": ninjas_api_key}

    response = requests_cache.requests.get(api_url, headers=headers)
    response.raise_for_status()

    data = response.json()[0]
    coordinates = {"latitude": data["latitude"], "longitude": data["longitude"]}
    return coordinates


def get_weather_history(lat, lng, start_date, end_date):
    cache_session = requests_cache.CachedSession(".cache", expire_after=-1)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": {lat},
        "longitude": {lng},
        "start_date": {start_date},
        "end_date": {end_date},
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation"],
    }
    responses = openmeteo.weather_api(url, params=params)

    response = responses[0]

    hourly = response.Hourly()
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
    hourly_precipitation = hourly.Variables(2).ValuesAsNumpy()

    hourly_data = {
        "date": pd.date_range(
            start=pd.to_datetime(hourly.Time(), unit="s"),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s"),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left",
        )
    }
    hourly_data["temperature_2m"] = hourly_temperature_2m
    hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m
    hourly_data["precipitation"] = hourly_precipitation

    hourly_dataframe = pd.DataFrame(data=hourly_data)
    return hourly_dataframe


def get_histories_and_save(cities):
    for city in cities:
        coordinates = get_coordinates(city)
        latitude = coordinates["latitude"]
        longitude = coordinates["longitude"]
        history_df = get_weather_history(
            latitude, longitude, "2014-01-01", "2024-01-30"
        )

        history_df.to_csv(f"weather_history/{city}.csv", index=False)
        print(f"Successfully saved history for {city}")


# get_histories_to_csv(cities)

# train_models_from_csv(cities)
