import Card from '../../Card/Card'
import './TodaysWeather.css'
import useWeatherStore from '../../stores/weatherStore';
import { IoCalendarNumberOutline, IoLocationOutline } from 'react-icons/io5'
import { useEffect } from 'react';

const TodaysWeather = () => {
    const currentWeatherData = useWeatherStore((state) => state.currentWeatherData)
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
                    console.warn("Error getting current location:", error);
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
        }, 3600000); // Refrescar datos cada 1 hora

        return () => clearInterval(interval)

    }, [currentLocation])

    if (!currentWeatherData) return

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    }
    const formattedDate = `${new Date().toLocaleDateString(undefined, dateOptions)}`

    return (
        <div className='TodaysWeather'>
            <h3>Today</h3>
            <Card
                className='panel'
                padding='2em'
                backgroundColor='var(--card-bg)'
            >
                <span>Now</span>

                <div className='temperature spaced-row'>
                    <span>{Math.round(currentWeatherData.main.temp)}°C</span>
                    <img src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt="Current weather image icon" />
                </div>

                <span className='todays-weather_description capitalize'>{currentWeatherData.weather[0].description}</span>

                <br />
                <hr />
                <br />

                <div className='spaced-row capitalize'>
                    <IoCalendarNumberOutline size={20} />
                    <span>{formattedDate}</span>
                </div>
                <div className='spaced-row'>
                    <IoLocationOutline size={20} />
                    <span>{currentWeatherData.name}, {currentWeatherData.sys.country}</span>
                </div>
            </Card>
        </div>
    )
}

export default TodaysWeather
