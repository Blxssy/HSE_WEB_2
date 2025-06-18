const Forecast = ({ data }) => {
	if (!data || !data.list || data.list.length === 0) return null

	return (
		<div>
			<h2>Forecast</h2>
			<div className='forecast-container'>
				{data.list.slice(0, 5).map(item => (
					<div key={item.dt} className='forecast-card'>
						<h3>{new Date(item.dt * 1000).toLocaleString()}</h3>
						<p>
							<strong>Temp:</strong> {item.main.temp} °C
						</p>
						<p>
							<strong>Weather:</strong> {item.weather[0].description}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Forecast
