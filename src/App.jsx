import { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import PopularCities from './components/PopularCities'
import SearchForm from './components/SearchForm'
import './styles.css'
import { fetchCurrentWeather, fetchForecast } from './utils/api'

function App() {
	const [currentWeather, setCurrentWeather] = useState(null)
	const [forecast, setForecast] = useState(null)
	const [error, setError] = useState(null)
	const [currentCity, setCurrentCity] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [forecastError, setForecastError] = useState(null)

	// Добавим AbortController для отмены запросов
	useEffect(() => {
		const controller = new AbortController()
		return () => controller.abort()
	}, [])

	const handleSearch = async city => {
		if (!city.trim()) return

		setIsLoading(true)
		setError(null)
		setForecastError(null)
		setCurrentCity(city)

		try {
			// Запрашиваем текущую погоду
			const current = await fetchCurrentWeather(city)
			setCurrentWeather(current)

			// Пробуем получить прогноз с задержкой
			try {
				// Простой вариант без race, но с таймаутом в axios
				const forecastData = await fetchForecast(city)
				setForecast(forecastData)
			} catch (forecastErr) {
				console.warn('Forecast loading failed:', forecastErr)
				setForecastError('Forecast not available')
				setForecast(null)
			}
		} catch (err) {
			console.error('Weather loading error:', err)
			setError(
				err.response?.data?.message || err.message || 'Failed to load weather'
			)
			setCurrentWeather(null)
			setForecast(null)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='app'>
			<h1>Weather App</h1>
			<p>Check weather details of different cities</p>

			<SearchForm onSearch={handleSearch} disabled={isLoading} />

			{isLoading && <div className='loading'>Loading weather data...</div>}

			{error && (
				<div className='error-message'>
					<p>⚠️ {error}</p>
					<button onClick={() => setError(null)}>Dismiss</button>
				</div>
			)}

			{!isLoading && currentWeather && (
				<>
					<CurrentWeather data={currentWeather} />

					{forecast ? (
						<Forecast data={forecast} />
					) : (
						forecastError && (
							<div className='forecast-error'>
								<p>⚠️ {forecastError}</p>
							</div>
						)
					)}
				</>
			)}

			<PopularCities
				onCitySelect={handleSearch}
				currentCity={currentCity}
				disabled={isLoading}
			/>
		</div>
	)
}

export default App
