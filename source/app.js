import React, {useState, useEffect} from 'react';
import {Box, Text} from 'ink';
import axios from 'axios';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function App({name = 'london'}) {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const response = await axios.get(
					'http://api.openweathermap.org/data/2.5/weather',
					{
						params: {
							q: name,
							appid: '155ebd62e312f4e0751b1bb914a0627d',
						},
					},
				);
				setWeather(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchWeather();
	}, []);

	return (
		<>
			<Gradient name="summer">
				<BigText text="weather cli" align="center" font="chrome" />
			</Gradient>
			<Box flexDirection="column" alignItems="center">
				{loading ? (
					<Text>
						<Spinner type="dots" />
						{' Loading...'}
					</Text>
				) : error ? (
					<Text color="red">{`Error: ${error}`}</Text>
				) : weather ? (
					<Box flexDirection="column" borderStyle="round" borderColor="blue" padding={2}>
						<Text>{`Weather in ${weather.name}`}</Text>
						<Text>{`Description: ${weather.weather[0].description}`}</Text>
						<Text>{`Temperature: ${weather.main.temp}°K`}</Text>
						<Text>{`Feels Like: ${weather.main.feels_like}°K`}</Text>
						<Text>{`Humidity: ${weather.main.humidity}%`}</Text>
						<Text>{`Wind Speed: ${weather.wind.speed} m/s`}</Text>
						<Text>{`Cloud Coverage: ${weather.clouds.all}%`}</Text>
					</Box>
				) : null}
			</Box>
		</>
	);
}