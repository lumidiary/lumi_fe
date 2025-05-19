import styled from 'styled-components';
import { Modal, Button } from '@components/common/index';

interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModalProps = ({
  isVisible,
  onClose,
  onLogout,
}: LogoutModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ContentWrapper>
        <Title>로그아웃 하시겠습니까?</Title>
        <Description>
          로그아웃하면 일기를 조회하거나 작성할 수 없어요.
        </Description>
        <ButtonGroup>
          <Button
            type="setting"
            buttonText="닫기"
            bgColor="#E5E7EB"
            txtColor="#000"
            onClick={onClose}
          />
          <Button type="setting" buttonText="로그아웃" onClick={onLogout} />
        </ButtonGroup>
      </ContentWrapper>
    </Modal>
  );
};

export default LogoutModalProps;

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
