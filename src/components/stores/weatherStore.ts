import { create } from 'zustand'
import { WeatherData } from '../../types';

const apiKey = import.meta.env.VITE_OW_API_KEY
const apiBaseUrl = import.meta.env.VITE_OW_BASE_URL

interface WeatherState {
    weatherData: WeatherData | null,
    loading: boolean,
    error: string | null,
    currentLocation: string,
    setLocation: (location: string) => void,
    fetchWeather: (location: string | { lat: number, lon: number }) => void,
}

const useWeatherStore = create<WeatherState>((set) => ({
    weatherData: null,
    loading: false,
    error: null,
    currentLocation: 'Barcelona',
    setLocation: (location) => set({ currentLocation: location }),
    fetchWeather: async (location) => {
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

            const data: WeatherData = await response.json()
            set({ weatherData: data, loading: false })

        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
}))

export default useWeatherStore