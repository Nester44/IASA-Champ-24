import pandas as pd
import multiprocessing
from prophet import Prophet
from prophet.serialize import model_to_json, model_from_json
from constants import indicators


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


def predict_weather(dataframe):
    future_df = pd.DataFrame()
    future_dates = pd.date_range(start=dataframe["date"].iloc[-1], periods=72, freq="H")
    future_df["ds"] = future_dates

    target_columns = ["temperature_2m", "precipitation", "relative_humidity_2m"]
    models = {}
    for column in target_columns:
        models[column] = train_prophet_model(dataframe, column)

    forecasts = {}
    for column, model in models.items():
        future = model.make_future_dataframe(periods=72, freq="H")
        forecast = model.predict(future)
        forecasts[column] = forecast

    return forecasts


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
