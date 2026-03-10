import styled, { createGlobalStyle, keyframes } from "styled-components";

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const tokens = {
  bg:          "#ffffff",
  surface:     "#ffffff",
  surface2:    "#f4f4f5",
  border:      "rgba(0,0,0,0.08)",
  borderActive:"rgba(0,0,0,0.2)",
  text:        "#0a0a0a",
  muted:       "#6b7280",
  accent:      "#0a0a0a",
  accentGlow:  "rgba(0,0,0,0.08)",
  accentHover: "#1a1a1a",
  success:     "#22c55e",
  error:       "#ef4444",
  font:        "'Sora', sans-serif",
  mono:        "'JetBrains Mono', monospace",
} as const;

// ─── Keyframes ────────────────────────────────────────────────────────────────
const drift = keyframes`
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.06); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: none; }
`;

const pop = keyframes`
  from { transform: scale(0.7); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
`;

// ─── Global Styles ────────────────────────────────────────────────────────────
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${tokens.bg};
    font-family: ${tokens.font};
  }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(130px);
    pointer-events: none;
  }

  &::before {
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
    top: -220px;
    right: -120px;
    animation: ${drift} 13s ease-in-out infinite alternate;
  }

  &::after {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
    bottom: -160px;
    left: -100px;
    animation: ${drift} 16s ease-in-out infinite alternate-reverse;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${tokens.surface};
  border: 1px solid ${tokens.border};
  border-radius: 20px;
  padding: 44px 40px 40px;
  position: relative;
  z-index: 1;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.9) inset,
    0 12px 32px rgba(0,0,0,0.08);
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 520px) {
    padding: 36px 22px 32px;
    border-radius: 16px;
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
`;

export const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  background: ${tokens.accent};
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-family: ${tokens.mono};
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -1px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
`;

export const LogoText = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: ${tokens.text};
  letter-spacing: -0.3px;
`;

// ─── Heading ──────────────────────────────────────────────────────────────────
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${tokens.text};
  letter-spacing: -0.5px;
  margin-bottom: 5px;
  line-height: 1.25;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${tokens.muted};
  margin-bottom: 28px;
  font-weight: 400;
`;

// ─── Social Buttons ───────────────────────────────────────────────────────────
export const SocialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 11px 16px;
  background: ${tokens.surface2};
  border: 1px solid ${tokens.border};
  border-radius: 12px;
  color: ${tokens.text};
  font-family: ${tokens.font};
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #e5e7eb;
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
  margin-bottom: 24px;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${tokens.border};
`;

export const DividerText = styled.span`
  font-size: 12px;
  color: ${tokens.muted};
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

// ─── Form Fields ──────────────────────────────────────────────────────────────
export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const Field = styled.div`
  margin-bottom: 14px;

  label {
    display: block;
    font-size: 12.5px;
    font-weight: 500;
    color: #9898b0;
    margin-bottom: 6px;
    letter-spacing: 0.1px;
  }
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input<{ $hasToggle?: boolean; $valid?: boolean; $error?: boolean }>`
  width: 100%;
  padding: ${({ $hasToggle }) => ($hasToggle ? "11px 44px 11px 14px" : "11px 14px")};
  background: ${tokens.surface2};
  border: 1px solid ${({ $valid, $error }) =>
    $valid  ? "rgba(34,197,94,0.4)"  :
    $error  ? "rgba(239,68,68,0.45)" :
    tokens.border};
  border-radius: 11px;
  color: ${tokens.text};
  font-family: ${tokens.font};
  font-size: 14px;
  font-weight: 400;
  outline: none;
  transition: all 0.2s ease;
  -webkit-appearance: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: rgba(0,0,0,0.13);
  }

  &:focus {
    border-color: ${tokens.borderActive};
    background: ${tokens.surface};
    box-shadow: 0 0 0 3px ${tokens.accentGlow};
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${tokens.muted};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.15s;

  &:hover {
    color: ${tokens.text};
  }
`;

// ─── Password Strength ────────────────────────────────────────────────────────
export const StrengthWrap = styled.div`
  margin-top: 8px;
`;

export const StrengthBars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 5px;
`;

export const StrengthBar = styled.div<{ $active?: boolean; $color?: string }>`
  flex: 1;
  height: 3px;
  border-radius: 4px;
  background: ${({ $active, $color }) => ($active && $color ? $color : tokens.surface2)};
  border: 1px solid rgba(0,0,0,0.04);
  transition: background 0.3s ease;
`;

export const StrengthLabel = styled.span<{ $color: string }>`
  font-size: 11.5px;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

// ─── Password Rules ───────────────────────────────────────────────────────────
export const PwRulesBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  margin-top: 10px;
  padding: 12px 14px;
  background: ${tokens.surface2};
  border-radius: 10px;
  border: 1px solid ${tokens.border};
  animation: ${fadeIn} 0.2s ease both;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const PwRule = styled.div<{ $ok?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: ${({ $ok }) => ($ok ? tokens.success : tokens.muted)};
  transition: color 0.2s;
`;

export const RuleDot = styled.span<{ $ok?: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${({ $ok }) => ($ok ? "rgba(34,197,94,0.15)" : "rgba(0,0,0,0.06)")};
  color: ${({ $ok }) => ($ok ? tokens.success : "transparent")};
  transition: all 0.2s;
`;

// ─── Match Hint ───────────────────────────────────────────────────────────────
export const MatchHint = styled.p<{ $ok?: boolean }>`
  font-size: 11.5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ $ok }) => ($ok ? tokens.success : tokens.error)};
  animation: ${fadeIn} 0.2s ease;
`;

// ─── Terms ────────────────────────────────────────────────────────────────────
export const TermsRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 4px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-top: 1px;
    accent-color: ${tokens.accent};
    cursor: pointer;
    flex-shrink: 0;
  }

  span {
    font-size: 12.5px;
    color: ${tokens.muted};
    line-height: 1.5;
  }

  a {
    color: ${tokens.accent};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: ${tokens.accentHover};
    }
  }
`;

// ─── Submit Button ────────────────────────────────────────────────────────────
export const SubmitButton = styled.button`
  width: 100%;
  padding: 13px;
  background: ${tokens.accent};
  border: none;
  border-radius: 12px;
  color: white;
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
    background: ${tokens.accentHover};
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

// ─── Success State ────────────────────────────────────────────────────────────
export const SuccessBox = styled.div`
  text-align: center;
  padding: 24px 0 8px;
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

export const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(34,197,94,0.12);
  border: 1px solid rgba(34,197,94,0.25);
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
  animation: ${pop} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

export const SuccessTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${tokens.text};
  margin-bottom: 8px;
  letter-spacing: -0.3px;
`;

export const SuccessText = styled.p`
  font-size: 13.5px;
  color: ${tokens.muted};
  line-height: 1.6;
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const CardFooter = styled.p`
  text-align: center;
  margin-top: 22px;
  font-size: 13px;
  color: ${tokens.muted};

  a {
    color: ${tokens.accent};
    font-weight: 500;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: ${tokens.accentHover};
    }
  }
`;
