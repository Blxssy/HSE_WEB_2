const PopularCities = ({ onCitySelect, currentCity }) => {
	const cities = ['Nizhny Novgorod', 'Moscow', 'Tokyo', 'New York']

	return (
		<div>
			<h2>Popular Cities</h2>
			<div className='popular-cities'>
				{cities.map(city => (
					<button
						key={city}
						onClick={() => onCitySelect(city)}
						style={{
							backgroundColor: currentCity === city ? '#555' : '#333',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.5rem 1rem',
							cursor: 'pointer',
							transition: 'background-color 0.3s',
						}}
					>
						{city}
					</button>
				))}
			</div>
		</div>
	)
}

export default PopularCities
