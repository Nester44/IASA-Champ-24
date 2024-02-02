import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from './api'

export type WeatherData = {
	timestamp: string
	currentTemperature: number
	lowestTemperature: number
	highestTemperature: number
	precipitation_probability_max: number
	precipitation_probability_min: number
	precipitation_probability_mean: number
	humidity_max: number
	humidity_min: number
	humidity_mean: number
}

export async function fetchWeather(
	context: QueryFunctionContext<[string, { location: string }]>,
) {
	const [_, { location }] = context.queryKey

	const response = await api.get<WeatherData[]>('forecast/' + location)

	return response.data
}
