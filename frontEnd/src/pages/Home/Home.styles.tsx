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
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 600;
  color: #444;
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
  color: var(--text);
  margin: 0 0 24px;
  letter-spacing: -2.5px;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;

  span {
    background: linear-gradient(135deg, var(--text) 0%, #555 100%);
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
      background: var(--text);
      border-radius: 4px;
    }
  }
`;

export const HeroDesc = styled.p`
  color: var(--text-3);
  max-width: 560px;
  margin: 0 auto 36px;
  font-size: 1.1rem;
  line-height: 1.7;
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
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.1px;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
        ? `
    background: var(--accent);
    color: var(--accent-fg);
    border: 1px solid var(--accent);
    box-shadow: 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    &:hover {
      background: color-mix(in srgb, var(--accent) 85%, transparent);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    `
        : `
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border-2);
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
`;

export const StatItem = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
  }

  span {
    font-size: 12px;
    color: var(--text-4);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 36px;
  background: var(--border);
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
  color: var(--text);
  letter-spacing: -0.8px;
  margin: 0;

  span {
    color: var(--text-4);
  }
`;

export const SectionLink = styled.a`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding-bottom: 1px;
  transition: all 0.2s ease;

  &:hover {
    gap: 8px;
    border-color: var(--text);
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
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  height: 100%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

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
  background: var(--bg-3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  color: var(--text);
  transition: all 0.25s ease;

  ${FeatureCard}:hover & {
    background: var(--accent);
    color: var(--accent-fg);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 6px;
  letter-spacing: -0.2px;
`;

export const FeatureDesc = styled.p`
  font-size: 13px;
  color: var(--text-3);
  line-height: 1.6;
  margin: 0;
`;

// ─── Courses Grid ─────────────────────────────────────────────────────────────
export const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 14px;
  margin-top: 4px;
`;

// ─── Section Intro (label + heading + optional sub) ───────────────────────────
export const SectionIntro = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

export const SectionLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-4);
  margin: 0 0 12px;
`;

export const SectionHeading = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.04em;
  margin: 0 0 12px;
`;

export const SectionSub = styled.p`
  font-size: 1rem;
  color: var(--text-3);
  line-height: 1.65;
  max-width: 520px;
  margin: 0 auto;
  letter-spacing: -0.01em;
`;

// ─── Steps (Comment ça marche) ────────────────────────────────────────────────
export const StepsSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 5rem;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
`;

export const StepItem = styled.div`
  background: var(--surface);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: var(--bg-2);
  }
`;

export const StepNum = styled.span`
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  color: var(--border-2);
  margin-bottom: 4px;
`;

export const StepTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
  margin: 0;
`;

export const StepDesc = styled.p`
  font-size: 13.5px;
  color: var(--text-3);
  line-height: 1.65;
  margin: 0;
`;

export const StepIconWrap = styled.div`
  width: 36px;
  height: 36px;
  background: var(--bg-3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  margin-bottom: 6px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TestimonialsSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 5rem;
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 14px;
`;

export const TestimonialCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.13);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
  }
`;

export const TestimonialStars = styled.div`
  display: flex;
  gap: 3px;
  margin-bottom: 16px;
  color: #22c55e;
  font-size: 13px;
`;

export const TestimonialQuote = styled.p`
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 20px;
  flex: 1;
`;

export const TestimonialAuthor = styled.div`
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

export const AuthorName = styled.span`
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
`;

export const AuthorRole = styled.span`
  font-size: 12px;
  color: var(--text-4);
`;

// ─── CTA Banner ───────────────────────────────────────────────────────────────
export const CTABannerSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 6rem;
`;

export const CTABannerInner = styled.div`
  background: #0a0a0a;
  border-radius: 24px;
  padding: 72px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.07) 0%, transparent 60%);
    top: -160px;
    right: -120px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%);
    bottom: -80px;
    left: -80px;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 48px 28px;
  }
`;

export const CTABannerLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #22c55e;
  margin: 0 0 16px;
`;

export const CTABannerTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.05em;
  margin: 0 0 14px;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
`;

export const CTABannerSub = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 480px;
  margin: 0 auto 36px;
  line-height: 1.65;
`;

export const CTABannerActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

export const CTABannerBtn = styled.a<{ $variant?: "primary" | "outline" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? `
    background: #fff;
    color: #0a0a0a;
    border: 1px solid #fff;
    &:hover { background: #f4f4f5; transform: translateY(-2px); }
    `
      : `
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.18);
    &:hover { border-color: rgba(255,255,255,0.4); transform: translateY(-2px); }
  `}

  &:active { transform: translateY(0); }
  svg { transition: transform 0.2s ease; }
  &:hover svg { transform: translateX(3px); }
`;
