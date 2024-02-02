from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from constants import cities
from model import predict_weather, map_forecast


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/locations", methods=["GET"])
@cross_origin()
def locations_handler():
    return jsonify(cities)


@app.route("/forecast/<city>", methods=["GET"])
@cross_origin()
def forecast_handler(city: str):
    if city not in cities:
        return (
            jsonify(
                {
                    "error": "City not found.",
                    "message": f"City {city} is not in the list of available cities.",
                }
            ),
            404,
        )
    forecast = predict_weather(city)
    print(forecast)
    mapped = map_forecast(forecast)
    print(mapped)
    return jsonify(mapped)


if __name__ == "__main__":
    app.run(debug=True)
