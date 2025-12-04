// // ThemeContext.jsx
// // ----------------
// // Contiene: createContext + ThemeProvider
// // Scopo: fornire tema, colori e funzione toggle a tutta l'app

// import { createContext, useState } from "react";

// // 1) Creiamo il context
// export const ThemeContext = createContext();

// // 2) Provider che avvolge l'app e gestisce lo stato del tema
// export function ThemeProvider({ children }) {
//   // stato locale del provider: 'light' | 'dark'
//   const [theme, setTheme] = useState("light");

//   // funzione che inverte il tema
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // valori utili esposti dal provider
//   const isLight = theme === "light";
//   const value = {
//     theme, // stringa
//     toggleTheme, // funzione
//     isLight, // boolean
//     // palette semplificata esposta per i componenti
//     colors: {
//       background: isLight ? "#ffffff" : "#1a1a1a",
//       text: isLight ? "#000000" : "#ffffff",
//       primary: isLight ? "#007bff" : "#0d6efd",
//       secondary: isLight ? "#6c757d" : "#adb5bd",
//       card: isLight ? "#f8f9fa" : "#2d2d2d",
//     },
//   };

//   // Nota: ogni volta che value cambia, i componenti che consumano il context ri-renderizzeranno (react ottimizza però)
//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// }
