import { createContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: (mode: boolean) => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  toggleDarkMode: () => {},
  darkMode: false,
});

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         toggleDarkMode,
//         darkMode,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };
