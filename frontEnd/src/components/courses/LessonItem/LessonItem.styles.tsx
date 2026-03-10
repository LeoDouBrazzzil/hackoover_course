import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
export const LessonCard = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${({ $completed }) => ($completed ? "rgba(34,197,94,0.2)" : "rgba(0,0,0,0.07)")};
  background: ${({ $completed }) => ($completed ? "rgba(240,253,244,0.8)" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${fadeUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  position: relative;
  overflow: hidden;

  /* Accent left bar on completed */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 3px 0 0 3px;
    background: ${({ $completed }) => ($completed ? "#22c55e" : "transparent")};
    transition: background 0.2s ease;
  }

  &:hover {
    border-color: ${({ $completed }) => ($completed ? "rgba(34,197,94,0.35)" : "rgba(0,0,0,0.14)")};
    background: ${({ $completed }) => ($completed ? "rgba(220,252,231,0.7)" : "#f9fafb")};
    transform: translateX(2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  &:active {
    transform: translateX(0);
  }
`;

// ─── Index badge ──────────────────────────────────────────────────────────────
export const LessonIndex = styled.div<{ $completed?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 13.5px;
  font-family: 'Sora', sans-serif;
  background: ${({ $completed }) => ($completed ? "rgba(34,197,94,0.12)" : "#f4f4f5")};
  color: ${({ $completed }) => ($completed ? "#16a34a" : "#374151")};
  border: 1px solid ${({ $completed }) => ($completed ? "rgba(34,197,94,0.2)" : "rgba(0,0,0,0.06)")};
  transition: all 0.2s ease;

  ${LessonCard}:hover & {
    background: ${({ $completed }) => ($completed ? "rgba(34,197,94,0.18)" : "#ebebef")};
  }
`;

// ─── Content ──────────────────────────────────────────────────────────────────
export const LessonContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LessonTitle = styled.div<{ $completed?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $completed }) => ($completed ? "#6b7280" : "#0a0a0a")};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  text-decoration-color: #9ca3af;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
`;

export const LessonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
`;

export const LessonDuration = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-family: 'Sora', sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 11px;
    height: 11px;
    color: #c0c0cc;
  }
`;

// ─── Status icon ──────────────────────────────────────────────────────────────
export const LessonStatus = styled.div<{ $completed?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $completed }) => ($completed ? "rgba(34,197,94,0.12)" : "transparent")};
  border: 1.5px solid ${({ $completed }) => ($completed ? "#22c55e" : "rgba(0,0,0,0.15)")};
  color: ${({ $completed }) => ($completed ? "#22c55e" : "#c0c0cc")};
  transition: all 0.2s ease;
  font-size: 12px;

  svg {
    width: 12px;
    height: 12px;
  }
`;
