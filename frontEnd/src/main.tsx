import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "config/configuration.ts";
import {I18nProvider} from "./i18n";
import { ColorThemeProvider } from "./theme/ThemeContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ColorThemeProvider>
        <I18nProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </QueryClientProvider>
        </I18nProvider>
        </ColorThemeProvider>
    </React.StrictMode>
);
