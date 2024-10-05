import { useEffect } from 'react';
import './App.css'
import Header from './components/Header/Header'
import useWeatherStore from './components/stores/weatherStore'
import TodaysWeather from './components/Weather/TodaysWeather/TodaysWeather'

function App() {
    const fetchWeather = useWeatherStore((state) => state.fetchWeather)
    const currentLocation = useWeatherStore((state) => state.currentLocation)

    useEffect(() => {
        // Obtener la ubicación actual del usuario
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather({ lat: latitude, lon: longitude });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                    if (currentLocation) {
                        fetchWeather(currentLocation);
                    }
                }
            );
        };

        getLocation()

        const interval = setInterval(() => {
            if (currentLocation) {
                fetchWeather(currentLocation)
            }
        }, 300000); // Refrescar datos cada 5 minutos

        return () => clearInterval(interval)

    }, [currentLocation, fetchWeather])

    return (
        <div className="App">
            <Header />
            <main>
                <TodaysWeather />
            </main>
        </div>
    )
}

export default App