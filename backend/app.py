from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

api_key = os.environ.get('API_NINJAS_KEY')


def city_to_coordinates(city):
    if not api_key:
        raise ValueError('API key is missing')

    api_url = f"https://api.api-ninjas.com/v1/geocoding?city={city}"
    headers = {
        'X-Api-Key': api_key
    }

    response = requests.get(api_url, headers=headers)
    response.raise_for_status()

    data = response.json()[0]
    coordinates = {
        "latitude": data["latitude"],
        "longitude": data["longitude"]
    }
    return coordinates


@app.route('/forecast', methods=['GET'])
def get_coordinates_route():
    city_name = request.args.get('city')

    if not city_name:
        return jsonify({'error': 'Missing city parameter'}), 400

    try:
        coordinates = city_to_coordinates(city_name)
        return jsonify(coordinates)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
