import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from './api'

type MatchedSubstring = {
	length: number
	offset: number
}

type Term = {
	offset: number
	value: string
}

type StructuredFormatting = {
	main_text: string
	main_text_matched_substrings: MatchedSubstring[]
	secondary_text: string
}

type Prediction = {
	description: string
	matched_substrings: MatchedSubstring[]
	place_id: string
	reference: string
	structured_formatting: StructuredFormatting
	terms: Term[]
	types: string[]
}

type PredictionsResponse = {
	predictions: Prediction[]
	status: string
}

export async function fetchLocations(
	context: QueryFunctionContext<[string, { input: string }]>,
) {
	const [_, { input }] = context.queryKey

	if (!input) return
	const response = await api.get<PredictionsResponse>('locations/' + input)

	return response.data
}
