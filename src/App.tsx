import './App.css'
import Header from './components/Header/Header'
import TodaysWeather from './components/Weather/TodaysWeather/TodaysWeather'
import FiveDayForecast from './components/Weather/FiveDayForecast/FiveDayForecast';

function App() {
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