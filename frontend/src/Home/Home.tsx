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
						<div className='mx-auto my-8' style={{ height: 450 }}>
							<Chart dayForecast={data} />
						</div>
						<Cards dayForecast={data} />
					</>
				)}
			</div>
		</div>
	)
}
