import { useRef, useState } from 'react'
import './Header.css'
import { IoSearch } from 'react-icons/io5'
import { TbCurrentLocation } from 'react-icons/tb'
import ImpulseSpinnerWrapper from '../../wrappers/ImpulseSpinnerWrapper'
import useWeatherStore from '../stores/weatherStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const searchInput = useRef<HTMLInputElement | null>(null)

    const currentLocation = useWeatherStore((state) => state.currentLocation)
    const setLocation = useWeatherStore((state) => state.setLocation)
    const loading = useWeatherStore((state) => state.loading)
    const navigate = useNavigate()

    const handleSearch = () => {
        if (inputValue.trim() && currentLocation.toLocaleLowerCase() !== inputValue.trim().toLocaleLowerCase()) {
            setLocation(inputValue).then(success => {
                if (success) {
                    // Accede al currentLocation actualizado después de que `setLocation` complete
                    const updatedLocation = useWeatherStore.getState().currentLocation

                    const formattedLocation = updatedLocation.trim().split(' ')
                        .map(word => word.toLocaleLowerCase())
                        .join('-'); // Formatea la URL tipo: `vilanova-del-cami`

                    // Navega a la URL usando el `currentLocation` actualizado y formateado
                    navigate(`/weather/${formattedLocation}`)
                }
            });
        }
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className='Header'>
            {/* App Title */}
            <h1 className='app-title'>
                <span refl-text='s'>s</span>
                <span refl-text='Weather'>Weather</span>
                <span refl-text='.'>.</span>
            </h1>

            {/* Search location weather */}
            <div className="search-location" onClick={() => searchInput.current?.focus()}>
                <IoSearch />
                <input
                    ref={searchInput}
                    type="text"
                    name='search-location'
                    placeholder='Search location...'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <span className='search-loader'>
                    <ImpulseSpinnerWrapper
                        size={20}
                        frontColor='var(--clr-accent)'
                        loading={loading}
                    />
                </span>
            </div>

            {/* Current location weather */}
            <div className="current-location">
                <TbCurrentLocation />
                <span>Current location</span>
            </div>
        </div>
    )
}

export default Header
