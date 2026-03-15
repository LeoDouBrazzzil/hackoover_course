import styled, { createGlobalStyle, keyframes } from "styled-components";

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const tokens = {
  bg:          "var(--bg)",
  surface:     "var(--surface)",
  surface2:    "var(--bg-3)",
  border:      "var(--border)",
  borderActive:"var(--border-2)",
  text:        "var(--text)",
  muted:       "var(--text-3)",
  accent:      "var(--accent)",
  accentGlow:  "rgba(0,0,0,0.08)",
  accentHover: "color-mix(in srgb, var(--accent) 85%, transparent)",
  btnBg:       "var(--bg-3)",
  btnHover:    "var(--border-2)",
  font:        '"Geist", sans-serif',
  mono:        "'JetBrains Mono', monospace",
} as const;

// ─── Keyframes ────────────────────────────────────────────────────────────────
const drift = keyframes`
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.04); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ─── Global Styles ────────────────────────────────────────────────────────────
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: var(--bg);
    font-family: ${tokens.font};
  }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(125% 125% at 50% 90%, var(--surface) 40%, #475569 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
  }

  &::before {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
    top: -200px;
    right: -100px;
    animation: ${drift} 12s ease-in-out infinite alternate;
  }

  &::after {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
    bottom: -150px;
    left: -100px;
    animation: ${drift} 15s ease-in-out infinite alternate-reverse;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 40px;
  position: relative;
  z-index: 1;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.9) inset,
    0 12px 32px rgba(0,0,0,0.08);
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 480px) {
    padding: 32px 22px;
    border-radius: 16px;
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
`;

export const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  background: var(--accent);
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-family: ${tokens.mono};
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-fg);
  letter-spacing: -1px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
`;

export const LogoText = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.3px;
`;

// ─── Heading ──────────────────────────────────────────────────────────────────
export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.5px;
  margin-bottom: 6px;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 21px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-3);
  margin-bottom: 32px;
  font-weight: 400;
`;

// ─── Social Buttons ───────────────────────────────────────────────────────────
export const SocialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 14px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 11px;
  color: var(--text);
  font-family: ${tokens.font};
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;

  &:hover {
    background: var(--border-2);
    border-color: rgba(0,0,0,0.14);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ─── Divider ──────────────────────────────────────────────────────────────────
export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: var(--border);
`;

export const DividerText = styled.span`
  font-size: 12px;
  color: var(--text-3);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

// ─── Form Fields ──────────────────────────────────────────────────────────────
export const Field = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #9898b0;
    margin-bottom: 7px;
    letter-spacing: 0.1px;
  }
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input<{ $hasToggle?: boolean }>`
  width: 100%;
  padding: ${({ $hasToggle }) => ($hasToggle ? "12px 46px 12px 16px" : "12px 16px")};
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: ${tokens.font};
  font-size: 14.5px;
  font-weight: 400;
  outline: none;
  transition: all 0.2s ease;
  -webkit-appearance: none;

  &::placeholder {
    color: var(--text-4);
  }

  &:hover {
    border-color: rgba(0,0,0,0.13);
  }

  &:focus {
    border-color: var(--border-2);
    background: var(--surface);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.15s;

  &:hover {
    color: var(--text);
  }
`;

// ─── Remember / Forgot row ────────────────────────────────────────────────────
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const CheckboxWrap = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
    cursor: pointer;
    border-radius: 4px;
  }

  span {
    font-size: 13px;
    color: var(--text-3);
    font-weight: 400;
  }
`;

export const ForgotLink = styled.a`
  font-size: 13px;
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: color-mix(in srgb, var(--accent) 85%, transparent);
  }
`;

// ─── Submit Button ────────────────────────────────────────────────────────────
export const SubmitButton = styled.button`
  width: 100%;
  padding: 13px;
  background: var(--accent);
  border: none;
  border-radius: 12px;
  color: var(--accent-fg);
  font-family: ${tokens.font};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: -0.1px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover {
    background: color-mix(in srgb, var(--accent) 85%, transparent);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  vertical-align: middle;
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const CardFooter = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 13.5px;
  color: var(--text-3);

  a {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: color-mix(in srgb, var(--accent) 85%, transparent);
    }
  }
`;

export const Terms = styled.p`
  text-align: center;
  font-size: 11.5px;
  color: var(--text-4);
  margin-top: 20px;
  line-height: 1.6;

  a {
    color: var(--text-3);
    text-decoration: underline;
  }
`;
