import { ImpulseSpinner } from 'react-spinners-kit'

const ImpulseSpinnerWrapper = ({
    size = 30,
    frontColor = '#00ff89',
    backColor = '#4b4c56',
    sizeUnit = 'px',
    loading = true,
}) => {
    return (
        <ImpulseSpinner
            size={size}
            frontColor={frontColor}
            backColor={backColor}
            sizeUnit={sizeUnit}
            loading={loading}
        />
    )
}

export default ImpulseSpinnerWrapper
