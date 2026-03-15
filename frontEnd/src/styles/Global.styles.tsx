import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

    /* ── Light theme (default) ──────────────────────────────────── */
    :root {
        --bg:        #ffffff;
        --bg-2:      #f9f9f9;
        --bg-3:      #f4f4f5;
        --surface:   #ffffff;
        --text:      #0a0a0a;
        --text-2:    #374151;
        --text-3:    #6b7280;
        --text-4:    #9ca3af;
        --border:    rgba(0,0,0,0.07);
        --border-2:  rgba(0,0,0,0.12);
        --accent:    #0a0a0a;
        --accent-fg: #ffffff;
        --shadow-sm: 0 2px 8px rgba(0,0,0,0.05);
        --shadow-md: 0 4px 24px rgba(0,0,0,0.08);
        --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
        --gradient-bg: radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #475569 100%);
    }

    /* ── Dark theme ─────────────────────────────────────────────── */
    [data-theme="dark"] {
        --bg:        #0f0f0f;
        --bg-2:      #1a1a1a;
        --bg-3:      #242424;
        --surface:   #161616;
        --text:      #f4f4f5;
        --text-2:    #d1d5db;
        --text-3:    #9ca3af;
        --text-4:    #52525b;
        --border:    rgba(255,255,255,0.08);
        --border-2:  rgba(255,255,255,0.14);
        --accent:    #f4f4f5;
        --accent-fg: #0a0a0a;
        --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
        --shadow-md: 0 4px 24px rgba(0,0,0,0.45);
        --shadow-lg: 0 8px 32px rgba(0,0,0,0.6);
        --gradient-bg: radial-gradient(125% 125% at 50% 90%, #0f0f0f 40%, #1e293b 100%);
    }

    * { box-sizing: border-box; }
    html, body, #root { height: 100%; }

    body {
        margin: 0;
        font-family: "Geist", sans-serif;
        background: var(--bg);
        color: var(--text);
        transition: background 0.25s ease, color 0.25s ease;
    }

    a { color: inherit; text-decoration: none; }
`;

export const Main = styled.main`
    min-height: 100vh;
    width: 100%;
    position: relative;
`;

export const Background = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--gradient-bg);
    transition: background 0.4s ease;
`;
