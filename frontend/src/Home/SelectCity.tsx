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
// import { useDebounce } from 'use-debounce'

type Props = {
	setLocation: (location: string) => void
}

export function SelectCity({ setLocation }: Props) {
	const [input, setInput] = useState('')

	// const [value] = useDebounce(input, 200)

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['cities', { input }],
		queryFn: fetchLocations,
		enabled: Boolean(input),
	})

	const handleSetCity = (location: string) => {
		setLocation(location)
		setInput('')
	}

	return (
		<Command className='rounded-lg border shadow-md mx-auto max-w-96 mt-4'>
			<CommandInput
				onChangeCapture={(e) => setInput(e.currentTarget.value)}
				value={input}
				placeholder='Type a city name'
			/>
			<CommandList>
				{isLoading ? <CommandLoading>Hang on...</CommandLoading> : null}

				{isSuccess && data?.length === 0 ? (
					<CommandEmpty />
				) : null}

				{data?.map((city) => (
					<CommandItem
						key={city}
						onSelect={() => handleSetCity(city)}
					>
						{city}
					</CommandItem>
				))}
			</CommandList>
		</Command>
	)
}
