import styled from 'styled-components';

interface RecordProps {
  title?: string;
  content?: string;
  index: number;
}

const DigestRecordCard = ({ title, content, index }: RecordProps) => {
  return (
    <RecordCard>
      <RecordTitle>{title || `제목 없음 ${index + 1}`}</RecordTitle>
      <RecordContent>{content || '아직 분석된 내용이 없습니다.'}</RecordContent>
    </RecordCard>
  );
};

export default DigestRecordCard;

const RecordCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px 24px;
  border: 1px solid #e2e8f0;
`;

const RecordTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #4b9cd3;
  margin-bottom: 8px;
`;

const RecordContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;
