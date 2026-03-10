import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export const CoursesContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;
  animation: ${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

export const PageHeader = styled.div`
  margin-bottom: 28px;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #0a0a0a;
  letter-spacing: -0.8px;
  font-family: 'Sora', sans-serif;
  margin: 0 0 4px;
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: #9ca3af;
  font-family: 'Sora', sans-serif;
  margin: 0;
`;

// ─── Filters Bar ──────────────────────────────────────────────────────────────
export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 14px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 9px 14px 9px 36px;
  background: #f9fafb;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  font-size: 13.5px;
  font-family: 'Sora', sans-serif;
  color: #0a0a0a;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder { color: #c0c0cc; }

  &:focus {
    background: #fff;
    border-color: rgba(0,0,0,0.2);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(0,0,0,0.08);
  flex-shrink: 0;
`;

export const FilterSelect = styled.select`
  padding: 9px 32px 9px 12px;
  background: #f9fafb url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  font-size: 13px;
  font-family: 'Sora', sans-serif;
  font-weight: 500;
  color: #374151;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:focus {
    background-color: #fff;
    border-color: rgba(0,0,0,0.2);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
  }
`;

export const ResultCount = styled.span`
  font-size: 12.5px;
  color: #9ca3af;
  font-family: 'Sora', sans-serif;
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;
  flex-shrink: 0;
`;

// ─── Grid ─────────────────────────────────────────────────────────────────────
export const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonCard = styled.div`
  height: 210px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  background: linear-gradient(
    90deg,
    #f3f4f6 25%,
    #e9eaec 50%,
    #f3f4f6 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  color: #9ca3af;
  font-family: 'Sora', sans-serif;
  gap: 10px;

  svg {
    width: 40px;
    height: 40px;
    color: #d1d5db;
    margin-bottom: 4px;
  }

  strong {
    font-size: 15px;
    font-weight: 600;
    color: #374151;
  }

  span {
    font-size: 13px;
  }
`;
