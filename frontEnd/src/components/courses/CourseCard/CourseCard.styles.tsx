import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Wrapper ──────────────────────────────────────────────────────────────────
export const CardWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

// ─── Image ────────────────────────────────────────────────────────────────────
export const CardImage = styled.div`
  width: 100%;
  height: 168px;
  overflow: hidden;
  background: #f4f4f5;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
  }

  ${CardWrapper}:hover & img {
    transform: scale(1.06);
  }
`;

export const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f4f4f5 0%, #e9eaec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c0cc;

  svg {
    width: 32px;
    height: 32px;
  }
`;

// ─── Body ─────────────────────────────────────────────────────────────────────
export const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardCategory = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Sora', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LevelBadge = styled.span<{ $level?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'Sora', sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.1px;

  ${({ $level }) => {
  switch ($level?.toLowerCase()) {
    case "débutant":
      return `background: rgba(34,197,94,0.1); color: #16a34a; border: 1px solid rgba(34,197,94,0.2);`;
    case "intermédiaire":
      return `background: rgba(234,179,8,0.1); color: #b45309; border: 1px solid rgba(234,179,8,0.2);`;
    case "avancé":
      return `background: rgba(249,115,22,0.1); color: #c2410c; border: 1px solid rgba(249,115,22,0.2);`;
    case "expert":
      return `background: rgba(239,68,68,0.1); color: #b91c1c; border: 1px solid rgba(239,68,68,0.2);`;
    default:
      return `background: #f4f4f5; color: #374151; border: 1px solid rgba(0,0,0,0.08);`;
  }
}}
`;

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0a0a0a;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.2px;
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-family: 'Sora', sans-serif;
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 14px;
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin-top: auto;
`;

export const CardDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 500;
  color: #9ca3af;
  font-family: 'Sora', sans-serif;

  svg {
    width: 13px;
    height: 13px;
    color: #c0c0cc;
  }
`;

export const CardCTA = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #0a0a0a;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.1px;
  transition: gap 0.2s ease;

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
  }

  ${CardWrapper}:hover & {
    gap: 8px;

    svg {
      transform: translateX(2px);
    }
  }
`;
