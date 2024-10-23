import './App.css'
import Header from './components/Header/Header'
import TodaysWeather from './components/Weather/TodaysWeather/TodaysWeather'
import FiveDayForecast from './components/Weather/FiveDayForecast/FiveDayForecast'
import TodaysWeatherHourly from './components/Weather/TodaysWeatherHourly/TodaysWeatherHourly'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom'
import useWeatherStore from './components/stores/weatherStore'
import { useEffect } from 'react'

function WeatherApp() {
    const currentLocation = useWeatherStore((state) => state.currentLocation)
    const setLocation = useWeatherStore((state) => state.setLocation)
    const navigate = useNavigate()
    const { location } = useParams<{ location: string }>()

    useEffect(() => {
        if (location && location.toLocaleLowerCase() !== currentLocation.toLocaleLowerCase()) {
            setLocation(location)
        }
        
        if (!location) {
            navigate('/weather/Barcelona')
        }
    }, [location])

    return (
        <div className="WeatherApp">
            <Header />
            <main>
                <TodaysWeather />
                <div className="todays-details">
                    <TodaysWeatherHourly />
                    {/* TODO: TodaysHighlights */}
                </div>
                <FiveDayForecast />
            </main>
        </div>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta por defecto */}
                <Route path='/' element={<Navigate to='/weather/Barcelona' />} />
                {/* Ruta a la location de la url */}
                <Route path='/weather/:location' element={<WeatherApp />} />
            </Routes>
        </Router>
    )
}

export default App