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
        },
        colors: {
            darkGunmetal: '#1D2029',
            lotion: '#FDFDFB',
            yankeesBlue: '#252B43',
            charcoal: '#323853',
        },
    },
    variants: {},
    plugins: [],
}

