import { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  accentColor: string;
  accentWarm: string;
  chartGridColor: string;
  chartAxisColor: string;
  chartTickColor: string;
  chartLineColor: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
  accentColor: '#7c5fa0',
  accentWarm: '#c47a8a',
  chartGridColor: 'rgba(42,31,61,0.12)',
  chartAxisColor: 'rgba(42,31,61,0.4)',
  chartTickColor: 'rgba(42,31,61,0.6)',
  chartLineColor: '#7c5fa0',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const isDark = theme === 'dark';

  // Apply / remove the "dark" class on <html> whenever theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    isDark,
    accentColor:    isDark ? '#c4a0e0' : '#7c5fa0',
    accentWarm:     isDark ? '#e8b4b0' : '#c47a8a',
    chartGridColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(42,31,61,0.12)',
    chartAxisColor: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(42,31,61,0.4)',
    chartTickColor: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(42,31,61,0.6)',
    chartLineColor: isDark ? '#c4a0e0' : '#7c5fa0',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
