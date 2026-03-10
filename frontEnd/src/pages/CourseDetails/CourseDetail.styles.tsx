import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width:1100px;
  margin:2rem auto;
  padding:0 1rem;
`;

export const DetailGrid = styled.div`
  display:grid;
  grid-template-columns:2fr 1fr;
  gap:2rem;
  @media(max-width:900px){ grid-template-columns:1fr; }
`;

export const LessonsList = styled.div`
  display:flex;flex-direction:column;gap:8px;
`;
