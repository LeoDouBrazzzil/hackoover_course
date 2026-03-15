import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

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

export const Modal = styled.div`
  background: var(--surface);
  border-radius: 18px;
  width: 100%;
  max-width: 660px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  animation: ${fadeUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
`;

export const HeaderInfo = styled.div``;

export const ModalTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 3px;
  letter-spacing: -0.02em;
`;

export const ModalSubtitle = styled.p`
  font-size: 0.8125rem;
  color: var(--text-3);
  margin: 0;
`;

export const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-4);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  &:hover { background: var(--bg-3); color: var(--text); }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Count = styled.span`
  font-size: 0.8125rem;
  color: var(--text-3);
  font-weight: 500;
`;

export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--accent);
  color: var(--accent-fg);
  border: none;
  border-radius: 9px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: color-mix(in srgb, var(--accent) 85%, transparent); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LessonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition: all 0.2s;

  &:hover {
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const LessonDragHandle = styled.div`
  color: var(--border-2);
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const LessonOrder = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-4);
  min-width: 20px;
  flex-shrink: 0;
`;

export const LessonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LessonTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LessonMeta = styled.span`
  font-size: 0.75rem;
  color: var(--text-4);
`;

export const LessonActions = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

export const IconBtn = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $danger }) =>
    $danger
      ? 'background:var(--surface); border-color:rgba(239,68,68,0.2); color:#ef4444; &:hover{background:#fef2f2; border-color:#ef4444;}'
      : 'background:var(--surface); border-color:var(--border-2); color:var(--text-3); &:hover{background:var(--bg-2); color:var(--text); border-color:rgba(0,0,0,0.2);}'}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 60px 24px;
  color: var(--text-4);
  text-align: center;

  p { font-size: 0.875rem; margin: 0; }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg-2);
  flex-shrink: 0;
`;

export const CloseFooterBtn = styled.button`
  padding: 9px 20px;
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

export const ErrorMsg = styled.div`
  padding: 10px 14px;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 10px;
  font-size: 0.8125rem;
  margin-bottom: 14px;
`;
