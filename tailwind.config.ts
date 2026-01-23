import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                "brand-dark": "#0f172a",
                "brand-accent": "#fbbf24",
                "brand-cta": "#16a34a",
                "brand-danger": "#ef4444",
                // Custom Colors
                "student-primary": "#137fec",
                "instructor-primary": "#13ec5b",
                "instructor-primary-hover": "#0fb845",
                "instructor-secondary": "#facc15",
                "instructor-bg-light": "#f6f8f6",
                "instructor-bg-dark": "#102216",
                "instructor-surface-dark": "#1a2e22",
                "instructor-surface-dark-2": "#23482f",
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7rAG6O2TRu9O0kbIgyQfYPdmaZ-7svyEiJrtIq8g_TmxY5tS072RO9Atte8cu9RvUaFaDTMEM-zZkgusmSGYpbUtVuKPYS2sweTl0eI5HFMSoZEdkWqORh6nEe0TV0_EaDAHLMAuIUGOeFql5XVLGOz6hlEdRCpZ7LYOjN1xkO9ReHNDdne01sDVSO4mNWU0r7WrJgwpObyJ_sbRyd5HxuoIYv3LDdN23k3SZQt4nRIoAyBbVEAtxLLxL7-qVdnnB2OqCDBv7kRED')",
            }
        }
    },
    plugins: [tailwindcssAnimate],
};
export default config;
