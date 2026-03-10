import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width:1100px;
  margin:2rem auto;
  padding:0 1rem;
`;

export const StatsGrid = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:12px;
`;

export const Card = styled.div`
  background:#fff;border:1px solid #e5e7eb;padding:16px;border-radius:12px;
`;
