import './App.css'
import Header from './components/Header/Header'
import TodaysWeather from './components/Weather/TodaysWeather/TodaysWeather'
import FiveDayForecast from './components/Weather/FiveDayForecast/FiveDayForecast'
import TodaysWeatherHourly from './components/Weather/TodaysWeatherHourly/TodaysWeatherHourly'

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <TodaysWeather />
                <div className="todays-details">
                    <TodaysWeatherHourly />
                </div>
                <FiveDayForecast />
            </main>
        </div>
    )
}

export default App