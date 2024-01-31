import { WeatherData } from '@/lib/api/fetchWeather'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

type Props = {
	dayForecast: WeatherData[]
}

export const Chart = ({ dayForecast }: Props) => {
	const mappedData = dayForecast.map((forecast) => ({
		time: new Date(forecast.timestamp).toLocaleTimeString('uk-ua', {
			hour: '2-digit',
			minute: '2-digit',
		}),
		precipitation: forecast.precipitation_probability_mean.toFixed(0),
		temperature: forecast.currentTemperature.toFixed(0),
	}))

	const minTemperature = Math.min(
		...mappedData.map((data) => Number(data.temperature)),
	)

	const maxTemperature = Math.max(
		...mappedData.map((data) => Number(data.temperature)),
	)

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				data={mappedData}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='time' />
				<YAxis domain={[minTemperature - 5, maxTemperature + 5]} />
				<Tooltip labelStyle={{ color: 'black' }} />
				<Legend />
				<Line
					type='monotone'
					dataKey='temperature'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}
