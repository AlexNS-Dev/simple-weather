export interface CurrentWeatherData {
    coord: {
        lon: number; // Longitud
        lat: number; // Latitud
    };
    weather: {
        id: number; // Identificador del clima (para uso interno)
        main: string; // Categoría principal del clima (p.ej. "Clear", "Rain")
        description: string; // Descripción más detallada del clima (p.ej. "light rain")
        icon: string; // URL del ícono que representa el clima
    }[];
    base: string; // Fuente de información meteorológica (p.ej. "stations", "metar")
    main: {
        temp: number; // Temperatura actual en grados Celsius
        feels_like: number; // Sensación térmica (qué tan caliente o fría se siente)
        temp_min: number; // Temperatura mínima del día
        temp_max: number; // Temperatura máxima del día
        pressure: number; // Presión atmosférica en hPa
        humidity: number; // Humedad en porcentaje (%)
    };
    visibility: number; // Visibilidad en metros
    wind: {
        speed: number; // Velocidad del viento en metros por segundo
        deg: number; // Dirección del viento en grados (0 = norte, 90 = este, etc.)
    };
    clouds: {
        all: number; // Porcentaje de nubosidad (0-100%)
    };
    dt: number; // Fecha y hora de la respuesta en formato Unix (timestamp)
    sys: {
        type?: number; // Tipo de sistema (opcional)
        id: number; // Identificador del sistema
        country: string; // Código de país (p.ej. "ES" para España)
        sunrise: number; // Hora del amanecer en formato Unix (timestamp)
        sunset: number; // Hora del atardecer en formato Unix (timestamp)
    };
    timezone: number; // Desplazamiento horario en segundos con respecto a UTC
    id: number; // Identificador único del lugar
    name: string; // Nombre del lugar (p.ej. "Barcelona")
    cod: number; // Código de respuesta del API (p.ej. 200 para éxito)
}

export interface FiveDayForecastData {
    dt_txt: string; // La fecha y hora en formato string
    main: {
        temp: number; // La temperatura principal
        temp_min: number; // Temperatura mínima
        temp_max: number; // Temperatura máxima
        pressure: number; // Presión atmosférica
        humidity: number; // Humedad
    };
    weather: {
        description: string; // Descripción del clima (ej. "clear sky")
        icon: string; // Icono del clima (ej. "04d")
    }[];
    wind: {
        speed: number; // Velocidad del viento
    };
    clouds: {
        all: number; // Porcentaje de nubosidad
    };
    rain?: {
        '3h': number; // Volumen de lluvia en mm durante las últimas 3 horas
    };
}