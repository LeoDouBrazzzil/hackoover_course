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
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.15s ease;
  overflow-y: auto;
`;

export const Modal = styled.div`
  background: var(--surface);
  border-radius: 18px;
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  animation: ${fadeUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  margin: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.02em;
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
  &:hover { background: var(--bg-3); color: var(--text); }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg-2);
  flex-shrink: 0;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-2);
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  font-size: 0.875rem;
  color: var(--text);
  background: var(--surface);
  transition: border-color 0.2s;
  outline: none;

  &:focus { border-color: var(--text); }
  &::placeholder { color: var(--text-4); }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 14px;
`;

// ── Tabs ──────────────────────────────────────────────────────────────────────

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border-2);
  border-radius: 12px;
  overflow: hidden;
`;

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--bg-2);
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  color: ${({ $active }) => ($active ? 'var(--text)' : 'var(--text-3)')};

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--text);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover { color: var(--text); background: rgba(0,0,0,0.03); }
`;

export const TabContent = styled.div`
  background: var(--surface);
  min-height: 320px;
`;

// ── Misc ──────────────────────────────────────────────────────────────────────

export const ErrorMsg = styled.div`
  padding: 10px 14px;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 10px;
  font-size: 0.8125rem;
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
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const SaveBtn = styled.button`
  padding: 9px 20px;
  border-radius: 9px;
  border: none;
  background: var(--accent);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-fg);
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) { background: color-mix(in srgb, var(--accent) 85%, transparent); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
