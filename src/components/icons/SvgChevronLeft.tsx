import { SVGProps } from 'react'
import clsx from 'clsx'

interface ExtendedSVGProps extends SVGProps<SVGSVGElement> {
    flip?: boolean
}

const SvgChevronLeft = (props: ExtendedSVGProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className={clsx('m-auto h-4 w-4', props.flip && 'rotate-180')}
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
        />
    </svg>
)
export default SvgChevronLeft
