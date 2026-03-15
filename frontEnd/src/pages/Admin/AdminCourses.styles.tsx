import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

// ── Layout ──────────────────────────────────────────────────────────────────

export const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const TitleGroup = styled.div``;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.03em;
  margin: 0 0 4px;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: var(--text-3);
  margin: 0;
`;

export const NewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--accent);
  color: var(--accent-fg);
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: color-mix(in srgb, var(--accent) 85%, transparent);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active { transform: translateY(0); }
`;

// ── Toast ────────────────────────────────────────────────────────────────────

export const Toast = styled.div<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  animation: ${fadeUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  ${({ $type }) =>
    $type === 'success'
      ? 'background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0;'
      : 'background:#fef2f2; color:#b91c1c; border:1px solid #fecaca;'}
`;

// ── Grid ─────────────────────────────────────────────────────────────────────

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

export const LoadingGrid = styled(Grid)``;

export const SkeletonCard = styled.div`
  height: 320px;
  border-radius: 14px;
  background: linear-gradient(90deg, var(--bg-3) 25%, var(--bg-2) 37%, var(--bg-3) 63%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 80px 24px;
  color: var(--text-4);
  text-align: center;

  p { font-size: 0.875rem; margin: 0; }
`;

// ── Course Card ───────────────────────────────────────────────────────────────

export const CardWrapper = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${fadeUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.12);
  }
`;

export const CardImageWrap = styled.div`
  height: 168px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

export const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
`;

export const CardBody = styled.div`
  padding: 18px;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Badge = styled.span<{ $variant?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  ${({ $variant }) => {
    switch ($variant) {
      case 'BEGINNER':     return 'background:#f0fdf4; color:#15803d;';
      case 'INTERMEDIATE': return 'background:#fefce8; color:#854d0e;';
      case 'ADVANCED':     return 'background:#fff7ed; color:#c2410c;';
      case 'EXPERT':       return 'background:#fef2f2; color:#b91c1c;';
      case 'featured':     return 'background:#faf5ff; color:#7c3aed;';
      default:             return 'background:var(--bg-3); color:var(--text-3);';
    }
  }}
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 6px;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardDesc = styled.p`
  font-size: 0.8125rem;
  color: var(--text-3);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 6px;
  padding: 12px 18px;
  border-top: 1px solid var(--border);
  background: var(--bg-2);
`;

export const ActionBtn = styled.button<{ $danger?: boolean; $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 11px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${({ $danger, $primary }) => {
    if ($danger)  return 'background:var(--surface); border-color:rgba(239,68,68,0.2); color:#ef4444; &:hover{background:#fef2f2; border-color:#ef4444;}';
    if ($primary) return 'background:var(--accent); border-color:var(--accent); color:var(--accent-fg); &:hover{background:color-mix(in srgb, var(--accent) 85%, transparent);}';
    return 'background:var(--surface); border-color:var(--border-2); color:var(--text-2); &:hover{background:var(--bg-2); border-color:rgba(0,0,0,0.2);}';
  }}
`;

// ── Delete confirm modal ──────────────────────────────────────────────────────

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.15s ease;
`;

export const ConfirmModal = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  animation: ${fadeUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ConfirmTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
`;

export const ConfirmText = styled.p`
  font-size: 0.875rem;
  color: var(--text-3);
  margin: 0 0 24px;
  line-height: 1.6;
`;

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CancelBtn = styled.button`
  padding: 9px 18px;
  border-radius: 9px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: var(--bg-2); }
`;

export const DangerBtn = styled.button`
  padding: 9px 18px;
  border-radius: 9px;
  border: none;
  background: #ef4444;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #dc2626; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
