import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from './api'

export type WeatherData = {
	timestamp: string
	humidity: number
	precipitation: number
	temperature: number
}

export async function fetchWeather(
	context: QueryFunctionContext<[string, { location: string }]>,
) {
	const [_, { location }] = context.queryKey

	const response = await api.get<WeatherData[]>('forecast/' + location)

	return response.data
}
