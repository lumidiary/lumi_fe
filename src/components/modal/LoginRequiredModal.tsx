import styled from 'styled-components';
import { Modal, Button } from '@components/common/index';

interface LoginRequiredModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginRequiredModal = ({
  isVisible,
  onClose,
  onLogin,
}: LoginRequiredModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ContentWrapper>
        <Title>로그인이 필요합니다</Title>
        <Description>
          일기 작성 기능을 사용하려면 로그인을 먼저 진행해주세요.
        </Description>
        <ButtonGroup>
          <Button
            type="setting"
            buttonText="닫기"
            bgColor="#E5E7EB"
            txtColor="#000"
            onClick={onClose}
          />
          <Button type="setting" buttonText="로그인하기" onClick={onLogin} />
        </ButtonGroup>
      </ContentWrapper>
    </Modal>
  );
};

export default LoginRequiredModal;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
`;
