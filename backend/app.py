from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


ninjas_api_key = os.environ.get("API_NINJAS_KEY")
google_maps_api_key = os.environ.get("GOOGLE_MAPS_API_KEY")

if not ninjas_api_key:
    raise ValueError("Ninjas API key is missing")

if not ninjas_api_key:
    raise ValueError("Ninjas API key is missing")


def city_to_coordinates(city):
    api_url = f"https://api.api-ninjas.com/v1/geocoding?city={city}"
    headers = {"X-Api-Key": ninjas_api_key}

    response = requests.get(api_url, headers=headers)
    response.raise_for_status()

    data = response.json()[0]
    coordinates = {"latitude": data["latitude"], "longitude": data["longitude"]}
    return coordinates


def get_locations(user_input):
    url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    params = {
        "input": user_input,
        "key": google_maps_api_key,
        "types": "locality",
    }

    response = requests.get(url, params=params)
    response.raise_for_status()

    data = response.json()
    return data


@app.route("/forecast/<city>", methods=["GET"])
@cross_origin()
def get_coordinates_route(city):
    if not city:
        return jsonify({"error": "Missing city parameter"}), 400

    try:
        coordinates = city_to_coordinates(city)
        print(coordinates)

        # read from tmp_weather.json and send its content
        with open("tmp_weather.json", "r") as f:
            weather_data = f.read()

            return weather_data

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/locations/<user_input>", methods=["GET"])
@cross_origin()
def get_locations_route(user_input):
    try:
        locations = get_locations(user_input)
        return jsonify(locations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
