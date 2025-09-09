import React, { ReactNode } from 'react';
export type Theme = 'light';
export type ColorScheme = 'light';
interface ThemeContextType {
    theme: Theme;
    colorScheme: ColorScheme;
    isDark: boolean;
}
interface ThemeProviderProps {
    children: ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map