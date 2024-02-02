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
	chartKey: string
}

export const Chart = ({ dayForecast, chartKey }: Props) => {
	const mappedData = dayForecast.map((forecast) => ({
		time: new Date(forecast.timestamp).toLocaleTimeString('uk-ua', {
			hour: '2-digit',
			minute: '2-digit',
		}),
		humidity: forecast.humidity_mean.toFixed(0),
		precipitation: forecast.precipitation_probability_mean.toFixed(0),
		temperature: forecast.currentTemperature.toFixed(0),
	}))

	const extremes: {[key: string]: {min: number, max: number}} = {
		temperature: {
			min: Math.min(...mappedData.map((data) => Number(data.temperature))) - 5,
			max: Math.max(...mappedData.map((data) => Number(data.temperature))) + 5
		},
		precipitation: { min: 0, max: 100 },
		humidity: { min: 0, max: 100 },
	};

	const formatters: {[key: string]: (tick: string) => string} = {
		temperature: (tick) => `${tick}°C`,
		precipitation: (tick) => `${tick}%`,
		humidity: (tick) => `${tick}%`,
	}

	const colors: {[key: string]: string} = {
		temperature: '#8884d8',
		precipitation: '#6ad6e8',
		humidity: '#c3eaf1'
	};

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
				<YAxis tickFormatter={formatters[chartKey]} domain={[extremes[chartKey].min, extremes[chartKey].max]} />
				<Tooltip labelStyle={{ color: 'black' }} />
				<Legend />
				<Line
					type='monotone'
					dataKey={chartKey}
					stroke={colors[chartKey]}
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}
