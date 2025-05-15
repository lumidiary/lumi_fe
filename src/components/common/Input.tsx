import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  fullWidth?: boolean;
  width?: string;
  height?: string;
}

const Input = ({
  className,
  fullWidth = true,
  width,
  height,
  ...rest
}: InputProps) => {
  return (
    <StyledInput
      className={className}
      fullWidth={fullWidth}
      width={width}
      height={height}
      {...rest}
    />
  );
};

export default Input;

const StyledInput = styled.input<{
  fullWidth?: boolean;
  width?: string;
  height?: string;
}>`
  width: ${({ fullWidth, width }) => (fullWidth ? '93%' : width || 'auto')};
  height: ${({ height }) => height || 'auto'};
  padding: 0.75rem;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #3399dd;
  }
`;
