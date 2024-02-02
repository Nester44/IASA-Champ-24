from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from api import get_coordinates
from constants import cities


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


if __name__ == "__main__":
    app.run(debug=True)
