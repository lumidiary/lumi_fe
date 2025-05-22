import styled from 'styled-components';
import { Modal, Button } from '@components/common/index';

interface DeleteAccountModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteAccountModalProps = ({
  isVisible,
  onClose,
  onDelete,
}: DeleteAccountModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ContentWrapper>
        <Title>회원탈퇴 하시겠습니까?</Title>
        <Description>
          탈퇴 시 계정은 비활성화 되며, 30일 후 모든 데이터가 삭제됩니다.
        </Description>
        <ButtonGroup>
          <Button
            type="setting"
            buttonText="닫기"
            bgColor="#E5E7EB"
            txtColor="#000"
            onClick={onClose}
          />
          <Button type="setting" buttonText="탈퇴하기" onClick={onDelete} />
        </ButtonGroup>
      </ContentWrapper>
    </Modal>
  );
};

export default DeleteAccountModalProps;

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
