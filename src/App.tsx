import { useEffect } from 'react';
import './App.css'
import Header from './components/Header/Header'
import useWeatherStore from './components/stores/weatherStore'
import TodaysWeather from './components/Weather/TodaysWeather/TodaysWeather'
import FiveDayForecast from './components/Weather/FiveDayForecast/FiveDayForecast';

function App() {
    const fetchCurrentWeather = useWeatherStore((state) => state.fetchCurrentWeather)
    const currentLocation = useWeatherStore((state) => state.currentLocation)

    useEffect(() => {
        // Obtener la ubicación actual del usuario
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchCurrentWeather({ lat: latitude, lon: longitude });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                    if (currentLocation) {
                        fetchCurrentWeather(currentLocation);
                    }
                }
            );
        };

        getLocation()

        const interval = setInterval(() => {
            if (currentLocation) {
                fetchCurrentWeather(currentLocation)
            }
        }, 300000); // Refrescar datos cada 5 minutos

        return () => clearInterval(interval)

    }, [currentLocation])

    return (
        <div className="App">
            <Header />
            <main>
                <TodaysWeather />
                <FiveDayForecast />
            </main>
        </div>
    )
}

export default App