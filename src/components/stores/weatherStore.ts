import { create } from 'zustand'
import { CurrentWeatherData, ForecastData } from '../../types';

const apiKey = import.meta.env.VITE_OW_API_KEY
const apiBaseUrl = import.meta.env.VITE_OW_BASE_URL

interface WeatherState {
    currentWeatherData: CurrentWeatherData | null,
    fiveDayForecastData: ForecastData[] | null,
    hourlyForecastData: ForecastData[] | null,
    loading: boolean,
    error: string | null,
    currentLocation: string,
    setLocation: (location: string) => void,
    fetchCurrentWeather: (location: string | { lat: number, lon: number }) => void,
    fetchFiveDayForecast: (location: string | { lat: number, lon: number }) => void,
}

const useWeatherStore = create<WeatherState>((set) => ({
    currentWeatherData: null,
    fiveDayForecastData: null,
    hourlyForecastData: null,
    loading: false,
    error: null,
    currentLocation: 'Barcelona',
    setLocation: (location) => set({ currentLocation: location }),
    fetchCurrentWeather: async (location) => {
        set({ loading: true, error: null })
        try {
            let url
            if (typeof location === 'string') {
                url = `${apiBaseUrl}/weather?q=${location}&appid=${apiKey}&units=metric`
            } else {
                const { lat, lon } = location
                url = `${apiBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            }

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data: CurrentWeatherData = await response.json()
            set({ currentWeatherData: data, loading: false })

        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
    fetchFiveDayForecast: (location) => {
        set({ loading: true, error: null })
        let url
        if (typeof location === 'string') {
            url = `${apiBaseUrl}/forecast?q=${location}&appid=${apiKey}&units=metric`
        } else {
            const { lat, lon } = location
            url = `${apiBaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch forecast data')
                }
                return response.json()
            })
            .then((data) => {
                const timezoneOffset = data.city.timezone * 1000;
                const currentTime = new Date().getTime();

                const filteredData = data.list.filter((item: { dt: number }) => {
                    const itemTime = new Date(item.dt * 1000).getTime() + timezoneOffset; // Ajuste de zona horaria
                    return itemTime >= currentTime; // Asegura que solo se capturan las predicciones futuras
                }).slice(0, 8);

                set({
                    fiveDayForecastData: data.list,
                    hourlyForecastData: filteredData, // Almacena el pronóstico horario filtrado
                    loading: false,
                })
            })
            .catch((err) => {
                set({ error: err.message, loading: false })
            })
    },
}))

export default useWeatherStore