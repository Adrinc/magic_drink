/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class'],
	theme: {
		extend: {      
			fontFamily: {
			sans: ["Inter", "OpenSans"],
		  },
		  colors: {
			primaryColor: 'var(--primary-color)',
			secondaryColor: 'var(--secondary-color)',
			primaryTextColor: 'var(--primary-text-color)',
			secondaryTextColor: 'var(--secondary-text-color)',
			tertiaryTextColor: 'var(--tertiary-text-color)',
			primaryBg: 'var(--primary-bg-color)',
			secondaryBg: 'var(--secondary-bg-color)',
			primaryGradient: 'var(--primary-gradient)',
			secondaryGradient: 'var(--secondary-gradient)',
			tertiaryGradient: 'var(--tertiary-gradient)',
		  },
		  borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		  }
		},
	},
	plugins: [require('tailwindcss-animated'), require('tailwindcss-animate')],
}
