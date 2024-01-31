import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { WeatherData } from '@/lib/api/fetchWeather'
import WeatherCard from './WeatherCard'

type Props = {
	dayForecast: WeatherData[]
}

export const Cards = ({ dayForecast }: Props) => {
	return (
		<ScrollArea className=' whitespace-nowrap rounded-md border'>
			<div className='flex w-max space-x-4 p-4'>
				{dayForecast.map((forecast) => (
					<WeatherCard key={forecast.timestamp} forecast={forecast} />
				))}
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	)
}
