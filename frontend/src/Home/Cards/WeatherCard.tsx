import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { HourlyForecast } from '@/lib/api/fetchWeather'

type Props = {
	forecast: HourlyForecast
}

const WeatherCard = ({ forecast }: Props) => {
	const { timestamp, humidity, precipitation, temperature } = forecast

	return (
		<Card>
			<CardHeader>
				<CardTitle>{temperature.toFixed(0)}°</CardTitle>
				<CardDescription>
					{new Date(timestamp).toLocaleTimeString('uk-ua', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Precipation: {precipitation.toFixed(0)}%</p>
				<p>Humidity: {humidity.toFixed(0)}%</p>
			</CardContent>
		</Card>
	)
}

export default WeatherCard
