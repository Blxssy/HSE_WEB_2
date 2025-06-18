import { useState } from 'react'

const SearchForm = ({ onSearch }) => {
	const [city, setCity] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (city.trim()) {
			onSearch(city)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={city}
				onChange={e => setCity(e.target.value)}
				placeholder='Enter city'
				required
			/>
			<button type='submit'>Search</button>
		</form>
	)
}

export default SearchForm
