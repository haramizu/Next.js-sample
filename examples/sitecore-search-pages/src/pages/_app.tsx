import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { LanguageContext } from "@/contexts/languageContext";
import useStorage from "@/lib/useLocalStorage";
import locales, { Language } from "@/data/locales";
import LocaleSelector from "@/components/LocaleSelector";
import { PageController, WidgetsProvider } from "@sitecore-search/react";
import {
  SEARCH_ENV,
  SEARCH_CUSTOMER_KEY,
  SEARCH_API_KEY,
} from "@/data/search";
import type { Environment } from "@sitecore-search/data";


export default function App({ Component, pageProps }: AppProps) {
  const [storageLanguage, setStorageLanguage] = useStorage(
    "lang",
    "en" as Language
  );
  const [language, setLanguage] = useState<Language>(storageLanguage);

  PageController.getContext().setLocaleLanguage(language);
  PageController.getContext().setLocaleCountry(locales[language].country);

  useEffect(() => {
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
    setStorageLanguage(language);
  }, [language, setStorageLanguage]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <WidgetsProvider
        env={SEARCH_ENV as Environment}
        customerKey={SEARCH_CUSTOMER_KEY}
        apiKey={SEARCH_API_KEY}
      >
        <LocaleSelector />
        <Component {...pageProps} />
      </WidgetsProvider>

    </LanguageContext.Provider>
  );
}