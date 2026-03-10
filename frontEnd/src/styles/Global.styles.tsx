import styled, { createGlobalStyle } from "styled-components";
import {theme} from "./theme/theme.ts";



export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    * { box-sizing: border-box; }
  html,body,#root { height: 100%; }
  body {
    margin: 0;
      font-family: "Geist", sans-serif;
      background: ${theme.colors.bg};
    color: ${theme.colors.text};
  }
  a { color: inherit; text-decoration: none; }
`

export const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

export const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%);
`;
