import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { WeatherData } from '@/lib/api/fetchWeather'

type Props = {
	forecast: WeatherData
}

const WeatherCard = ({ forecast }: Props) => {
	const {
		timestamp,
		highestTemperature,
		lowestTemperature,
		precipitation_probability_mean,
		currentTemperature,
		humidity_mean,
	} = forecast

	return (
		<Card>
			<CardHeader>
				<CardTitle>{currentTemperature.toFixed(0)}°</CardTitle>
				<CardDescription>
					{new Date(timestamp).toLocaleTimeString('uk-ua', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className='text-sm'>
					H:{highestTemperature.toFixed(0)}° L:
					{lowestTemperature.toFixed(0)}°
				</p>

				<p>Precipation: {precipitation_probability_mean.toFixed(0)}%</p>
				<p>Humidity: {humidity_mean.toFixed(0)}%</p>
			</CardContent>
		</Card>
	)
}
//celsium symbol

export default WeatherCard
