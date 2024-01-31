import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchWeather } from '@/lib/api/fetchWeather'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SelectCity } from './SelectCity'
import WeatherCard from './WeatherCard'

export function Home() {
	const [location, setLocation] = useState('')

	const { data, isSuccess } = useQuery({
		queryKey: ['forecast', { location }],
		queryFn: fetchWeather,
		enabled: Boolean(location),
	})

	if (isSuccess) {
		console.log(data)
	}

	return (
		<div className='dark'>
			<div className='max-h-12 relative'>
				<SelectCity setLocation={setLocation} />
			</div>
			<div>
				{location && <p className='text-lg'>{location}</p>}

				{isSuccess && data?.length > 0 && (
					<>
						<img
							src='https://static.vecteezy.com/system/resources/previews/000/406/151/original/vector-illustration-of-data-analysis-graph.jpg'
							alt=''
							className='w-96 h-96 mx-auto my-16'
						/>
						<ScrollArea className=' whitespace-nowrap rounded-md border'>
							<div className='flex w-max space-x-4 p-4'>
								{data?.map((forecast) => (
									<WeatherCard
										key={forecast.timestamp}
										forecast={forecast}
									/>
								))}
							</div>
							<ScrollBar orientation='horizontal' />
						</ScrollArea>
					</>
				)}
			</div>
		</div>
	)
}
