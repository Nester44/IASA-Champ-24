from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

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


@app.route("/forecast", methods=["GET"])
def get_coordinates_route():
    city_name = request.args.get("city")

    if not city_name:
        return jsonify({"error": "Missing city parameter"}), 400

    try:
        coordinates = city_to_coordinates(city_name)
        return jsonify(coordinates)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/locations/<user_input>", methods=["GET"])
def get_locations_route(user_input):
    try:
        locations = get_locations(user_input)
        return jsonify(locations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
