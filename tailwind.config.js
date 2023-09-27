/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'inner-discreet':
                    'inset 1px 1px 0 0 rgb(255 255 255 / 0.18), inset -1px -1px 1px 0 rgb(255 255 255 / 0.15)',
                'inner-discreet-hover':
                    'inset 3px 3px 20px 0 rgb(255 255 255 / 0.18), inset -3px -3px 20px 0 rgb(255 255 255 / 0.15)',
            },
            keyframes: {
                'dot-1': {
                    '0%': { opacity: '0.1' },
                    '10%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
                'dot-2': {
                    '0%': { opacity: '0.05' },
                    '30%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
                'dot-3': {
                    '0%': { opacity: '0' },
                    '70%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
            },
        },
        colors: {
            gunmetal: '#2a2e3b',
            darkGunmetal: '#1D2029',
            lotion: '#FDFDFB',
            yankeesBlue: '#252B43',
            charcoal: '#323853',
            manatee: '#9DA3AE',
            santasGray: '#939aaf',
            shinyShamrock: '#49A078',
            americanViolet: '#521687',
            lavenderIndigo: '#9052F2',
            chineseBlue: '#3C588E',
            nickel: '#656c7a',
            pastelRed: '#fa6a6a',
            pastelGreen: '#77D48D',
            grayishMagenta: '#d193d2',
            crayola: '#d0ed90',
            cornflower: '#90ceed',
            blueGray: '#619AD6',
        },
    },
    variants: {},
    plugins: [],
}
