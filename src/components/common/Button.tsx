import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  buttonText: string;
  type?: 'default | etc';
  className?: string;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  bgColor?: string;
  txtColor?: string;
}

/**
 * Common Button
 * isDisabled: button 비활성화 여부
 * type: 버튼 별 style (default, primary)
 * buttonText: 버튼 텍스트
 * bgColor: 버튼 배경색 (선택적)
 * @param  onClick () => void (onClick method)
 * @param isDisabled boolean (disabled status)
 */

const Button = ({
  onClick,
  buttonText,
  type,
  className,
  isDisabled,
  style,
  bgColor,
  txtColor,
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={`button ${type} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      bgColor={bgColor}
      txtColor={txtColor}
    >
      {buttonText}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{ bgColor?: string; txtColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  &.default {
    background-color: #4b9cd3;
    color: #fff;
  }

  &.etc {
    width: 100%;
    background-color: ${({ bgColor }) => bgColor || '#4b9cd3'};
    color: #fff;
    border-radius: 0.5rem;
    padding: 1rem 0;
    font-size: 1rem;
  }
`;
