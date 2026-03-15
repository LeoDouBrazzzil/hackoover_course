import { createContext, useContext, useState, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import fr from "./fr.json";
import en from "./en.json";

export type Locale = "fr" | "en";

const messages: Record<Locale, Record<string, string>> = { fr, en };

interface LocaleContextValue {
    locale: Locale;
    setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: "fr",
    setLocale: () => {},
});

const STORAGE_KEY = "hackoover_locale";

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored === "en" || stored === "fr") ? stored : "fr";
    });

    const setLocale = (l: Locale) => {
        localStorage.setItem(STORAGE_KEY, l);
        setLocaleState(l);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <IntlProvider locale={locale} messages={messages[locale]} defaultLocale="fr">
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
}

export const useLocale = () => useContext(LocaleContext);
