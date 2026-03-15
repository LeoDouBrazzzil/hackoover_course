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
  overflow-y: auto;
`;

export const Modal = styled.div`
  background: var(--surface);
  border-radius: 18px;
  width: 100%;
  max-width: 580px;
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
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 62vh;
  overflow-y: auto;

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

export const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  font-size: 0.875rem;
  color: var(--text);
  background: var(--surface);
  transition: border-color 0.2s;
  outline: none;
  resize: vertical;
  min-height: 96px;
  line-height: 1.6;

  &:focus { border-color: var(--text); }
  &::placeholder { color: var(--text-4); }
`;

export const Select = styled.select`
  padding: 10px 40px 10px 14px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  font-size: 0.875rem;
  color: var(--text);
  background: var(--surface);
  transition: border-color 0.2s;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus { border-color: var(--text); }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
`;

export const ToggleLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-2);
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;

  input { opacity: 0; width: 0; height: 0; }

  span {
    position: absolute;
    inset: 0;
    background: var(--border-2);
    border-radius: 24px;
    transition: 0.2s;
    &::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }

  input:checked + span { background: var(--accent); }
  input:checked + span::before { transform: translateX(18px); }
`;

export const ImageUploadArea = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 1.5px dashed rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-3);
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover { border-color: var(--text); color: var(--text); background: var(--bg-2); }
  input { display: none; }
`;

export const ImagePreview = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--border);
`;

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
