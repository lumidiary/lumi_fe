import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LuCalendar } from 'react-icons/lu';
import useAddressFromCoords from '@/hooks/useAddressFromCoords';

export interface DiaryData {
  diaryId: string;
  capturedAt: string;
  emotion: string;
  imageUrl: string;
  diarySummary: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
}

const DigestDiaryCard = ({ diary }: { diary: DiaryData }) => {
  const addressFromCoords = useAddressFromCoords(
    diary.latitude,
    diary.longitude,
  );
  const address = addressFromCoords || diary.address || 'No Place';

  return (
    <DiaryCard>
      <DiaryTopRow>
        <DiaryLeftGroup>
          <EmojiBox>{diary.emotion || '😊'}</EmojiBox>
          <DiaryDate>
            <LuCalendar
              size={16}
              style={{ color: '#757575', marginRight: '4px' }}
            />
            {diary.capturedAt || 'No Date'}
          </DiaryDate>
        </DiaryLeftGroup>
        <DiaryLocation>
          <FaMapMarkerAlt size={16} style={{ marginRight: '4px' }} />
          {address}
        </DiaryLocation>
      </DiaryTopRow>
      <Divider />
      <DiaryContentRow>
        <DiaryImageBox>
          {diary.imageUrl ? (
            <img src={diary.imageUrl} alt="diary" />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </DiaryImageBox>
        <DiaryTextBlock>
          <DiarySummary>
            {diary.diarySummary?.trim() !== ''
              ? diary.diarySummary
              : 'No Summary'}
          </DiarySummary>
        </DiaryTextBlock>
      </DiaryContentRow>
    </DiaryCard>
  );
};

export default DigestDiaryCard;

const DiaryCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

const DiaryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
`;

const DiaryLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const EmojiBox = styled.div`
  font-size: 1.2rem;
`;

const DiaryDate = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const DiaryLocation = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  text-align: right;
  display: flex;
  align-items: center;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 0;
`;

const DiaryContentRow = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;

const DiaryImageBox = styled.div`
  width: 258px;
  height: 194px;
  background-color: #f1f1f1;
  border-bottom-left-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    width: 100%;
    height: 100%;
    color: #e5e7eb;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DiaryTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const DiarySummary = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 30px;
  text-align: left;
  line-height: 1.6;
`;
