import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from './api'

export async function fetchLocations(
	context: QueryFunctionContext<[string, { input: string }]>,
) {
	const [_, { input }] = context.queryKey

	if (!input) return
	const response = await api.get<string[]>('locations/' + input)

	return response.data
}
