import React, { CSSProperties, ReactNode } from 'react'
import './Card.css'

interface CardProps {
    width?: string
    height?: string
    backgroundColor?: string
    padding?: string
    cornerSize?: 'sharp' | 'small' | 'medium' | 'large'
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

const Card: React.FC<CardProps> = ({
    width,
    height,
    backgroundColor,
    padding,
    cornerSize,
    children,
    className,
    style,
}) => {
    const defaultBorderRadius = () => {
        switch (cornerSize) {
            case 'sharp':
                return '0'
            case 'small':
                return '0.5em'
            case 'medium':
                return '1em'
            case 'large':
                return '2em'

            default:
                return '1em'
        }
    }

    const defaultStyles: CSSProperties = {
        width,
        height,
        backgroundColor,
        padding,
        borderRadius: defaultBorderRadius(),
    }

    return (
        <div
            className={`Card ${cornerSize} ${className}`}
            style={{ ...defaultStyles, ...style }}
        >
            {children}
        </div>
    )
}

export default Card
