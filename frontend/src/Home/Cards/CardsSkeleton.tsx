import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

const CardSkeleton = () => {
	return (
		<Card>
			<CardHeader>
				<Skeleton className='h-[24px] w-[48px]' />
			</CardHeader>
			<CardContent className='space-y-2 pt-4'>
				<Skeleton className='h-[20px] w-[122px]' />
				<Skeleton className='h-[20px] w-[122px]' />
			</CardContent>
		</Card>
	)
}

const CardsSkeleton = () => {
	return (
		<ScrollArea className=' whitespace-nowrap rounded-md border'>
			<div className='flex w-max space-x-4 p-4'>
				{[...Array(24)].map((_, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	)
}

export default CardsSkeleton
