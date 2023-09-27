import { SVGProps } from 'react'
import clsx from 'clsx'

interface ExtendedSVGProps extends SVGProps<SVGSVGElement> {
    flip?: boolean
}

const SvgChevronDoubleLeft = (props: ExtendedSVGProps) => (
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
            d="m18.75 19.5-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
    </svg>
)
export default SvgChevronDoubleLeft
