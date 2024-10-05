import Card from '../../Card/Card'
import './TodaysWeather.css'
import useWeatherStore from '../../stores/weatherStore';
import { IoCalendarNumberOutline, IoLocationOutline } from 'react-icons/io5'

const TodaysWeather = () => {
    const weatherData = useWeatherStore((state) => state.weatherData)

    if (!weatherData) return

    console.log(weatherData);

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    }
    const formattedDate = `${new Date().toLocaleDateString('es-ES', dateOptions)}`

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
                    <span>{Math.round(weatherData.main.temp)}°C</span>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Current weather image icon" />
                </div>

                <span className='todays-weather_description capitalize'>{weatherData.weather[0].description}</span>

                <br />
                <hr />
                <br />

                <div className='spaced-row capitalize'>
                    <IoCalendarNumberOutline size={20} />
                    <span>{formattedDate}</span>
                </div>
                <div className='spaced-row'>
                    <IoLocationOutline size={20} />
                    <span>{weatherData.name}, {weatherData.sys.country}</span>
                </div>
            </Card>
        </div>
    )
}

export default TodaysWeather
