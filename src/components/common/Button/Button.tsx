import { cn } from '@/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

// TS
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variation?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'transparent'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const Button = ({
    className,
    variation = 'primary',
    size = 'lg',
    children,
    ...attributes
}: IProps) => {
    const classes = cn(
        'rounded-lg font-bold shadow-inner-discreet cursor-pointer disabled:opacity-30 disabled:cursor-default [&:not(:disabled)]:hover:shadow-inner-discreet-hover',
        size === 'sm' ? 'py-0 px-2' : 'py-2.5 px-7',
        `text-${size}`,
        variation === 'primary' && 'bg-[#49A078]',
        variation === 'secondary' && 'bg-[#9052F2]',
        variation === 'tertiary' && 'bg-[#3C588E]',
        variation === 'neutral' && 'bg-[#656c7a]',
        variation === 'transparent' && 'bg-[transparent]',
        // additional
        className
    )

    return (
        <button
            {...attributes}
            className={classes}
        >
            {children}
        </button>
    )
}

export default Button
