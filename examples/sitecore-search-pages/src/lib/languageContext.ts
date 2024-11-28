import { createContext } from "react";

type Language = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (l: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "",
  setLanguage: (l: Language) => {
    console.log(`Language set to: ${l}`);
  },
});