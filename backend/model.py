import pandas as pd
import multiprocessing
from prophet import Prophet
from prophet.serialize import model_to_json, model_from_json
from constants import indicators, dataset_last_info
from datetime import datetime, timedelta


def train_prophet_model(dataframe, target_column):
    train_df = pd.DataFrame()
    train_df["ds"] = pd.to_datetime(dataframe["date"])
    train_df["y"] = dataframe[target_column]
    model = Prophet()
    model.add_seasonality(name="daily", period=1, fourier_order=1)
    model.add_seasonality(name="yearly", period=365.25, fourier_order=10)
    model.fit(train_df)
    return model


def preprocess(dataset):
    dataset.dropna()
    return dataset


def train_model_from_csv(city):
    history_df = pd.read_csv(f"weather_history/{city}.csv")
    for indicator in indicators:
        print(f"Started to train model: {city}:{indicator}")
        m = train_prophet_model(history_df, indicator)
        with open(f"models/{city}_{indicator}.json", "w") as f:
            f.write(model_to_json(m))
        print(f"Training finished for model: {city}:{indicator}")


def train_models_from_csv(cities):

    if __name__ == "__main__":
        multiprocessing.freeze_support()
        processes = []

        for city in cities:
            p = multiprocessing.Process(
                target=train_model_from_csv,
                args=(city,),
            )
            processes.append(p)
            p.start()

        for p in processes:
            p.join()
        print("All models are trained and saved to disk.")


def load_model(city, indicator):
    with open(f"models/{city}_{indicator}.json", "r") as f:
        m = model_from_json(f.read())
        return m


dataset_last_date = datetime.strptime(dataset_last_info, "%Y.%m.%d")
tomorrow = datetime.today().replace(
    hour=0, minute=0, second=0, microsecond=0
) + timedelta(days=2)
# Calculate the difference in hours
periods = int((tomorrow - dataset_last_date).total_seconds() / 3600)


def predict_weather(city):
    models = {}
    for indicator in indicators:
        models[indicator] = load_model(city, indicator)

    forecasts = {}
    for indicator, model in models.items():
        future = model.make_future_dataframe(
            periods=periods, freq="h", include_history=False
        )
        forecast = model.predict(future)
        forecasts[indicator] = forecast

    return forecasts


def map_forecast(forecasts):
    mapped_forecast = {}
    for indicator, forecast in forecasts.items():
        for i in range(len(forecast)):
            timestamp = forecast["ds"][i]
            yhat = forecast["yhat"][i]
            if timestamp not in mapped_forecast:
                mapped_forecast[timestamp] = {"timestamp": timestamp}
            mapped_forecast[timestamp][indicator] = yhat
    return list(mapped_forecast.values())[-24:]
