import React from "react";
import {Background, GlobalStyle, Main} from "styles/Global.styles";
import { ThemeProvider } from "styled-components";
import {theme} from "styles/theme/theme.ts";
import NavBar from "components/navbar/NavBar.tsx";

export default function Layout({ children } : { children: React.ReactNode }){
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Main>
                <Background />
                <NavBar/>

                {children}
            </Main>

        </ThemeProvider>
    )
}
