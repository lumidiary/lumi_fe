import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card = ({ children, className, style }: CardProps) => {
  return (
    <CardContainer className={className} style={style}>
      {children}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  min-width: 400px;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 2rem;
  margin: 3rem;
`;
