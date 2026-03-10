import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import App from "./App";
import {store} from "config/configuration.ts";
import {Auth0Provider} from "@auth0/auth0-react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={import.meta.env.VITE_AUTH0_DOMAIN}
                clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    //audience: import.meta.env.VITE_AUTH0_AUDIENCE, // IMPORTANT pour obtenir un access token pour TON API
                }}>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </Auth0Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
