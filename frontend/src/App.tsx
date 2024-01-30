import { SelectCity } from './Home/SelectCity'

function App() {
	console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
	return (
		<div className='dark flex justify-center h-screen w-full items-center'>
			<div className='max-w-80 w-full'>
				<SelectCity />
			</div>
		</div>
	)
}

export default App
