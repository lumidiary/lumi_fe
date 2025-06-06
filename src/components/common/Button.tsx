import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  buttonText: string;
  type?:
    | 'default'
    | 'etc'
    | 'login'
    | 'request'
    | 'header_signup'
    | 'header_login'
    | 'setting';
  className?: string;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  bgColor?: string;
  txtColor?: string;
  isToggled?: boolean;
}

/**
 * Common Button
 * isDisabled: button 비활성화 여부
 * type: 버튼 별 style (default, primary)
 * buttonText: 버튼 텍스트
 * bgColor: 버튼 배경색 (선택적)
 * @param  onClick () => void (onClick method)
 * @param isDisabled boolean (disabled status)
 * isToggled: 인증요청 버튼 색상 변경 여부 (외부에서 제어)
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
  isToggled,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ButtonContainer
      className={`button ${type ?? ''} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      style={style}
      bgColor={bgColor}
      txtColor={txtColor}
      toggled={isToggled}
    >
      {buttonText}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{
  bgColor?: string;
  txtColor?: string;
  toggled?: boolean;
}>`
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

  // 로그인, 회원가입, 비밀번호 변경 버튼
  &.login {
    width: 100%;
    background-color: #4b9cd3;
    color: #fff;
    border-radius: 0.5rem;
    padding: 0.8rem 0;
    font-size: 0.8rem;
    font-weight: bold;
  }

  // 인증 요청
  &.request {
    width: 25%;
    background-color: #fff;
    color: ${({ toggled }) => (toggled ? '#4b9cd3' : '#000')};
    border: 1px solid ${({ toggled }) => (toggled ? '#4b9cd3' : '#d1d5db')};
    border-radius: 0.5rem;
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  // Header
  &.header_signup {
    background-color: #4b9cd3;
    color: #fff;
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  &.header_login {
    background-color: #fff;
    color: #000;
    border: 1px solid #d9d9d9;
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  &.setting {
    background-color: ${({ bgColor }) => bgColor || '#4b9cd3'};
    color: ${({ txtColor }) => txtColor || '#fff'};
    border-radius: 0.3rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
  }
`;
