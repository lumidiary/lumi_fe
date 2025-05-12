import styled from 'styled-components';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showIcon?: boolean;
}

const BackHeader = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <HeaderContainer>
      <IoArrowBackOutline
        color="#000"
        size={24}
        style={{ paddingLeft: '14rem' }}
        onClick={handleBack}
      />
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem 0;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
`;

const Title = styled.div`
  font-size: 1.4rem;
  color: #000;
  margin-left: 5rem;
`;
