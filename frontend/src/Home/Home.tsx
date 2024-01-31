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
				{isSuccess && data?.length > 0 && (
					<>
						<p className='text-2xl my-2'>
							{location}{' '}
							{new Date(data[0].timestamp).toLocaleDateString(
								'uk-UA',
								{
									weekday: 'long',
									month: 'long',
									day: 'numeric',
								},
							)}
						</p>
						<div className='mx-auto mb-8' style={{ height: 450 }}>
							<Chart dayForecast={data} />
						</div>
						<Cards dayForecast={data} />
					</>
				)}
			</div>
		</div>
	)
}
