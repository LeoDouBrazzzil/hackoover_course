import styled, { keyframes, css } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
export const Page = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 1.25rem 6rem;
`;

// ─── Top hero ─────────────────────────────────────────────────────────────────
export const HeroRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.5s cubic-bezier(0.16,1,0.3,1) both;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const AvatarCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-fg);
  font-size: 1.6rem;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: -0.02em;
  border: 2px solid var(--border);
`;

export const HeroMeta = styled.div`
  flex: 1;
`;

export const HeroName = styled.h1`
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.05em;
  margin: 0 0 6px;
  line-height: 1.15;
`;

export const HeroBadge = styled.span<{ $premium?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;

  ${({ $premium }) => $premium ? css`
    background: rgba(34,197,94,0.12);
    color: #16a34a;
    border: 1px solid rgba(34,197,94,0.3);
  ` : css`
    background: var(--bg-3);
    color: var(--text-3);
    border: 1px solid var(--border);
  `}
`;

export const HeroSub = styled.p`
  font-size: 13px;
  color: var(--text-4);
  margin: 6px 0 0;
  letter-spacing: -0.01em;
`;

// ─── Stats strip ──────────────────────────────────────────────────────────────
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 2.5rem;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px 20px 18px;
  animation: ${fadeUp} 0.5s cubic-bezier(0.16,1,0.3,1) both;

  &:nth-child(1) { animation-delay: 0.05s; }
  &:nth-child(2) { animation-delay: 0.10s; }
  &:nth-child(3) { animation-delay: 0.15s; }
  &:nth-child(4) { animation-delay: 0.20s; }
`;

export const StatIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--bg-3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  margin-bottom: 12px;

  svg { width: 16px; height: 16px; }
`;

export const StatValue = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.05em;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: var(--text-4);
  margin-top: 5px;
  font-weight: 500;
`;

// ─── Two-column body ──────────────────────────────────────────────────────────
export const Body = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Panel (generic card) ─────────────────────────────────────────────────────
export const Panel = styled.div<{ $delay?: number }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px;
  animation: ${fadeUp} 0.55s cubic-bezier(0.16,1,0.3,1) both;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;

export const PanelTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.03em;
  margin: 0 0 20px;
`;

// ─── Profile form ─────────────────────────────────────────────────────────────
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-3);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--text);
  background: var(--bg-2);
  border: 1px solid var(--border-2);
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
  letter-spacing: -0.01em;

  &:focus {
    border-color: var(--text);
    box-shadow: 0 0 0 3px rgba(10,10,10,0.06);
    background: var(--surface);
  }

  &::placeholder { color: var(--text-4); }
`;

export const SaveButton = styled.button<{ $saving?: boolean; $saved?: boolean }>`
  margin-top: 8px;
  width: 100%;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 11px;
  border: none;
  cursor: ${({ $saving }) => $saving ? "wait" : "pointer"};
  transition: all 0.2s ease;
  letter-spacing: -0.1px;

  ${({ $saved }) => $saved ? css`
    background: rgba(34,197,94,0.12);
    color: #16a34a;
  ` : css`
    background: var(--accent);
    color: var(--accent-fg);
    &:hover { background: color-mix(in srgb, var(--accent) 85%, transparent); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  `}

  &:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.06);
  margin: 22px 0;
`;

export const DangerZone = styled.div`
  margin-top: 4px;
`;

export const DangerLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ef4444;
  margin: 0 0 10px;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  font-size: 13.5px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid rgba(239,68,68,0.3);
  background: rgba(239,68,68,0.05);
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background: rgba(239,68,68,0.1);
    border-color: rgba(239,68,68,0.5);
  }
`;

// ─── Courses in progress ──────────────────────────────────────────────────────
export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CourseRow = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
  cursor: pointer;

  &:hover {
    border-color: rgba(0,0,0,0.14);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    background: var(--surface);
  }
`;

export const CourseThumb = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-fg);
  flex-shrink: 0;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
  svg { width: 18px; height: 18px; }
`;

export const CourseInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CourseTitle = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 100px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: 100px;
  background: var(--accent);
  transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
`;

export const ProgressPct = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-3);
  min-width: 30px;
  text-align: right;
`;

export const CourseArrow = styled.div`
  color: var(--border-2);
  flex-shrink: 0;
  display: flex;
`;

export const EmptyBlock = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-4);
  font-size: 13.5px;
  border: 1px dashed var(--border-2);
  border-radius: 14px;

  svg {
    width: 28px;
    height: 28px;
    color: var(--border-2);
    margin-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  strong { display: block; font-size: 14px; color: var(--text-2); margin-bottom: 4px; }
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonPulse = styled.div`
  background: linear-gradient(90deg, var(--bg-3) 25%, var(--bg-2) 50%, var(--bg-3) 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 8px;
`;
