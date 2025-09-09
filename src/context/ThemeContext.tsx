import React, { createContext, useContext, ReactNode } from 'react';

// Theme types - Only light theme for modern clear mode
export type Theme = 'light';
export type ColorScheme = 'light';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  isDark: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component - Always uses light theme
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always use light theme for modern clear mode
  const theme: Theme = 'light';
  const colorScheme: ColorScheme = 'light';
  const isDark = false;

  const value: ThemeContextType = {
    theme,
    colorScheme,
    isDark
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
