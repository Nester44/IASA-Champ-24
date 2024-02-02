import { fetchWeather } from '@/lib/api/fetchWeather'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Cards } from './Cards'
import { Chart } from './Chart'
import { SelectCity } from './SelectCity'

export function Home() {
	const [location, setLocation] = useState('')

	const { data, isSuccess } = useQuery({
		queryKey: ['forecast', { location }],
		queryFn: fetchWeather,
		enabled: Boolean(location),
	})

	return (
		<div className='dark px-12'>
			<div className='max-h-11 z-10 relative'>
				<SelectCity setLocation={setLocation} />
			</div>

			<div>
				{isSuccess && data?.hourlyForecast.length > 0 && (
					<>
						<p className='text-2xl my-2'>
							{location.at(0)?.toUpperCase() + location.slice(1)}{' '}
							&nbsp;
							{new Date(
								data.hourlyForecast[0].timestamp,
							).toLocaleDateString('uk-UA', {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
							})}
						</p>

						<p className='text-5xl mb-2 text-gray-500'>
							H:{data.maxTemperature.toFixed(0)}° &nbsp;L:
							{data.minTemperature.toFixed(0)}°
						</p>

						<div className='mx-auto mb-8' style={{ height: 450 }}>
							<Chart dayForecast={data.hourlyForecast} />
						</div>
						<Cards dayForecast={data.hourlyForecast} />
					</>
				)}
			</div>
		</div>
	)
}
