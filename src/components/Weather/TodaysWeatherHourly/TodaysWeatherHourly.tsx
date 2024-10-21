import Card from '../../Card/Card'
import useWeatherStore from '../../stores/weatherStore'
import './TodaysWeatherHourly.css'
import { PiNavigationArrowFill } from "react-icons/pi"

const TodaysWeatherHourly = () => {
    const hourlyForecastData = useWeatherStore((state) => state.hourlyForecastData)
    const fiveDayForecastData = useWeatherStore((state) => state.fiveDayForecastData)

    if (!hourlyForecastData || !fiveDayForecastData) return

    return (
        <div className='TodaysWeatherHourly'>
            <h3>Today at</h3>
            <div className="hours">
                {hourlyForecastData.map((item, index) => {
                    // Utilizar dt_txt para obtener la fecha y hora
                    const date = new Date(item.dt_txt); // Convertir la fecha de string a objeto Date
                    const hours = date.getHours(); // Obtener la hora
                    const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // Formatear para 12 horas
                    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determinar AM/PM

                    return (
                        <div className="hour" key={index}> {/* Añadir key para optimización */}
                            <Card
                                className='panel'
                                padding='1.5em'
                                backgroundColor='var(--card-bg)'
                            >
                                <span>{formattedHour} {ampm}</span>

                                <span style={{display: 'flex', flexDirection: 'row', gap: '0'}}>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt="Weather icon"
                                    />
                                    {Math.round(item.main.temp)} °C
                                </span>

                                <hr />
                                <br />

                                <span>
                                    <PiNavigationArrowFill className='wind-direction' size={32} color='var(--clr-accent)' style={{ transform: `rotateZ(${item.wind.deg}deg)` }} />
                                    {Math.round(item.wind.speed)} km/h
                                </span>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default TodaysWeatherHourly
