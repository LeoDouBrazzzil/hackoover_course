import styled, { keyframes } from "styled-components";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;
const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.05); }
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88vh;
  padding: 0 1rem;

  /* Ambient background orbs */
  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
    top: -100px;
    right: -150px;
    border-radius: 50%;
    animation: ${pulse} 8s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
    bottom: 0;
    left: -100px;
    border-radius: 50%;
    animation: ${pulse} 10s ease-in-out infinite reverse;
    pointer-events: none;
  }
`;

export const HeroContainer = styled.div`
  max-width: 820px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: #f4f4f5;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 600;
  color: #444;
  font-family: 'Sora', sans-serif;
  letter-spacing: 0.2px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;

  span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 7vw, 5.2rem);
  line-height: 1.0;
  font-weight: 800;
  color: #0a0a0a;
  margin: 0 0 24px;
  letter-spacing: -2.5px;
  font-family: 'Sora', sans-serif;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;

  span {
    background: linear-gradient(135deg, #0a0a0a 0%, #555 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 4px;
      width: 100%;
      height: 4px;
      background: #0a0a0a;
      border-radius: 4px;
    }
  }
`;

export const HeroDesc = styled.p`
  color: #6b7280;
  max-width: 560px;
  margin: 0 auto 36px;
  font-size: 1.1rem;
  line-height: 1.7;
  font-family: 'Sora', sans-serif;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
`;

export const HeroCTAGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
`;

export const CTABtn = styled.a<{ $variant?: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  font-family: 'Sora', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.1px;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
        ? `
    background: #0a0a0a;
    color: #fff;
    border: 1px solid #0a0a0a;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    &:hover {
      background: #1a1a1a;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    `
        : `
    background: #fff;
    color: #0a0a0a;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    &:hover {
      border-color: rgba(0,0,0,0.2);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }
  `}

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

// ─── Stats strip ─────────────────────────────────────────────────────────────
export const StatsStrip = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin: 0 auto 5rem;
  max-width: 600px;
  padding: 0 1rem;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
`;

export const StatItem = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 1.6rem;
    font-weight: 800;
    color: #0a0a0a;
    font-family: 'Sora', sans-serif;
    letter-spacing: -1px;
  }

  span {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(0,0,0,0.08);
  align-self: center;
`;

// ─── Section wrapper ──────────────────────────────────────────────────────────
export const Section = styled.section<{ $alt?: boolean }>`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #0a0a0a;
  letter-spacing: -0.8px;
  font-family: 'Sora', sans-serif;
  margin: 0;

  span {
    color: #9ca3af;
  }
`;

export const SectionLink = styled.a`
  font-size: 13.5px;
  font-weight: 600;
  color: #0a0a0a;
  text-decoration: none;
  font-family: 'Sora', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding-bottom: 1px;
  transition: all 0.2s ease;

  &:hover {
    gap: 8px;
    border-color: #0a0a0a;
  }
`;

// ─── Features Grid ────────────────────────────────────────────────────────────
export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
  max-width: 1100px;
  margin: 0 auto 5rem;
  padding: 0 1rem;
`;

export const FeatureCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  /* Subtle top accent line */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
    transition: background 0.3s ease;
  }

  &:hover {
    border-color: rgba(0,0,0,0.14);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  }

  &:hover::before {
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent);
  }
`;

export const FeatureIconWrap = styled.div`
  width: 40px;
  height: 40px;
  background: #f4f4f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  color: #0a0a0a;
  transition: all 0.25s ease;

  ${FeatureCard}:hover & {
    background: #0a0a0a;
    color: #fff;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 14.5px;
  font-weight: 700;
  color: #0a0a0a;
  margin: 0 0 6px;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.2px;
`;

export const FeatureDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  font-family: 'Sora', sans-serif;
`;

// ─── Courses Grid ─────────────────────────────────────────────────────────────
export const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 14px;
  margin-top: 4px;
`;
