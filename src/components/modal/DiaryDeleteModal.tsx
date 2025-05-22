import styled from 'styled-components';
import { Modal, Button } from '@components/common/index';

interface DiaryDeleteModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DiaryDeleteModalProps = ({
  isVisible,
  onClose,
  onDelete,
}: DiaryDeleteModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ContentWrapper>
        <Title>정말 삭제하시겠습니까?</Title>
        <Description>일기를 삭제하면 다시 볼 수 없어요.</Description>
        <ButtonGroup>
          <Button
            type="setting"
            buttonText="닫기"
            bgColor="#E5E7EB"
            txtColor="#000"
            onClick={onClose}
          />
          <Button type="setting" buttonText="삭제하기" onClick={onDelete} />
        </ButtonGroup>
      </ContentWrapper>
    </Modal>
  );
};

export default DiaryDeleteModalProps;

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
