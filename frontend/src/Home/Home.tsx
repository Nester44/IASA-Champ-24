import { fetchWeather } from '@/lib/api/fetchWeather'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Cards } from './Cards'
import { Chart } from './Chart'
import { SelectCity } from './SelectCity'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'

function TabController(props: {chartKey: string, onTabChange: (value: string) => void}) {
	return (
		<Tabs value={props.chartKey} onValueChange={props.onTabChange} defaultValue="temperature" className="py-2">
			<TabsList>
				<TabsTrigger value="temperature">Temperature</TabsTrigger>
				<TabsTrigger value="precipitation">Precipitation</TabsTrigger>
				<TabsTrigger value="humidity">Humidity</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export function Home() {
	const [location, setLocation] = useState('')
	const [chartKey, setChartKey] = useState('temperature')

	const onTabChange = (value: string) => {
		setChartKey(value);
	};

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
						<TabController chartKey={chartKey} onTabChange={onTabChange}></TabController>
						<div className='mx-auto mb-8' style={{ height: 450 }}>
							<Chart dayForecast={data} chartKey={chartKey}/>
						</div>
						<Cards dayForecast={data} />
					</>
				)}
			</div>
		</div>
	)
}
