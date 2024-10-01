import { useRef, useState } from 'react'
import './Header.css'
import { IoSearch } from 'react-icons/io5'
import { ImpulseSpinner } from 'react-spinners-kit'
import { TbCurrentLocation } from 'react-icons/tb'

// const apiKey = import.meta.env.VITE_OW_API_KEY

const Header = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const searchInput = useRef<HTMLInputElement | null>(null)

    return (
        <div className='Header'>
            {/* App Title */}
            <h1 className='app-title'><span>s</span>Weather<span>.</span></h1>

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
                />
                <ImpulseSpinner
                    size={20}
                    frontColor='var(--clr-accent)'
                    loading={true}
                />
            </div>

            {/* Current location weather */}
            <div className="current-location">
                <TbCurrentLocation />
                <span>Current Location</span>
            </div>
        </div>
    )
}

export default Header
