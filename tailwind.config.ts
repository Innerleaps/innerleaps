
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
			},
			fontSize: {
				'xs': ['0.875rem', { lineHeight: '1.5' }],    // 14px -> 16px equivalent
				'sm': ['1rem', { lineHeight: '1.5' }],        // 16px
				'base': ['1.125rem', { lineHeight: '1.6' }],  // 18px
				'lg': ['1.25rem', { lineHeight: '1.6' }],     // 20px
				'xl': ['1.375rem', { lineHeight: '1.5' }],    // 22px
				'2xl': ['1.5rem', { lineHeight: '1.4' }],     // 24px
				'3xl': ['1.875rem', { lineHeight: '1.3' }],   // 30px
				'4xl': ['2.25rem', { lineHeight: '1.2' }],    // 36px
				'5xl': ['3rem', { lineHeight: '1.1' }],       // 48px
				'6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Verbeterde contrasten voor toegankelijkheid
				brand: {
					blue: '#1e40af',           // Donkerder voor beter contrast
					'blue-light': '#3b82f6',
					'blue-dark': '#1e3a8a',
					green: '#047857',          // Donkerder groen voor beter contrast
					'green-light': '#059669',
					'green-dark': '#065f46',   // Nieuwe donkere variant
					'gray-light': '#f8fafc',
					'gray-medium': '#475569',  // Donkerder voor beter contrast
					'gray-dark': '#1e293b',    // Nog donkerder voor optimaal contrast
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
