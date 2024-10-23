import { create } from 'zustand'
import { CurrentWeatherData, ForecastData } from '../../types';

const apiKey = import.meta.env.VITE_OW_API_KEY
const apiBaseUrl = import.meta.env.VITE_OW_BASE_URL
const geoApiBaseUrl = import.meta.env.VITE_OW_GEO_BASE_URL

interface WeatherState {
    currentWeatherData: CurrentWeatherData | null,
    fiveDayForecastData: ForecastData[] | null,
    hourlyForecastData: ForecastData[] | null,
    loading: boolean,
    error: string | null,
    currentLocation: string,
    setLocation: (location: string | { lat: number, lon: number }) => Promise<boolean>,
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
    setLocation: async (location) => {
        set({ loading: true, error: null })
        let url;

        if (typeof location === 'string') {
            // Construir la URL para búsqueda directa
            url = `${geoApiBaseUrl}/direct?q=${location}&limit=1&appid=${apiKey}`
        } else {
            // Construir la URL para búsqueda inversa
            const { lat, lon } = location;
            url = `${geoApiBaseUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
        }

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch location data')
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.length > 0) {
                    const locationName = data[0].name
                    set({ currentLocation: locationName, loading: false })
                    return true // Ubicación válida
                } else {
                    throw new Error('Location not found')
                }
            })
            .catch((err) => {
                set({ error: err.message, loading: false })
                console.error("Location change failed:", err.message)
                return false // Ubicación no válida
            });
    },
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
                    const itemTime = new Date(item.dt * 1000).getTime() + timezoneOffset;
                    return itemTime >= currentTime;
                });

                // Si faltan pronósticos para completar las 8 horas, rellenar con el día siguiente
                const numItemsToFill = 8 - filteredData.length;
                const hourlyForecastData = filteredData.length >= 8
                    ? filteredData.slice(0, 8) // Si ya hay suficientes datos, tomamos los primeros 8
                    : [...filteredData, ...data.list.slice(0, numItemsToFill)]; // Rellenamos con el siguiente día si faltan datos

                set({
                    fiveDayForecastData: data.list,
                    hourlyForecastData, // Almacena el pronóstico horario filtrado
                    loading: false,
                })
            })
            .catch((err) => {
                set({ error: err.message, loading: false })
            })
    },
}))

export default useWeatherStore