import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return <CardContainer className={className}>{children}</CardContainer>;
};

export default Card;

const CardContainer = styled.div`
  background-color: #ffffff;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;
