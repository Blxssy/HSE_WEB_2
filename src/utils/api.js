import axios from 'axios'

const API_KEY = '1a2af42186818b885fc9324c8ccf333f'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	params: {
		appid: API_KEY,
		units: 'metric',
	},
})

export const fetchCurrentWeather = async city => {
	try {
		const response = await apiClient.get('/weather', {
			params: { q: city },
			timeout: 2000,
		})
		return response.data
	} catch (error) {
		console.error('Current weather fetch error:', error)
		throw error
	}
}

export const fetchForecast = async city => {
	try {
		const response = await apiClient.get('/forecast', {
			params: { q: city },
			timeout: 2000,
		})
		return response.data
	} catch (error) {
		console.error('Forecast fetch error:', error)
		throw error
	}
}
