import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandLoading,
} from '@/components/ui/command'
import { fetchLocations } from '@/lib/api/fetchLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export function SelectCity() {
	const [input, setInput] = useState('')

	const [value] = useDebounce(input, 200)

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['cities', { input: value }],
		queryFn: fetchLocations,
		enabled: Boolean(value),
	})

	return (
		<Command className='rounded-lg border shadow-md mx-auto max-w-96 mt-40'>
			<CommandInput
				onChangeCapture={(e) => setInput(e.currentTarget.value)}
				placeholder='Type a city name'
			/>
			<CommandList>
				{isLoading ? <CommandLoading>Hang on...</CommandLoading> : null}

				{isSuccess && data?.predictions.length === 0 ? (
					<CommandEmpty />
				) : null}

				{data?.predictions.map((prediction) => (
					<CommandItem
						key={prediction.description}
						onSelect={(value) => console.log('Selected', value)}
					>
						{prediction.description}
					</CommandItem>
				))}
			</CommandList>
		</Command>
	)
}
