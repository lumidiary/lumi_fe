import styled from 'styled-components';

interface EmotionStat {
  emoji: string;
  count: number;
  label: string;
}

interface EmotionStatListProps {
  stats: EmotionStat[];
}

const EmotionStatList = ({ stats }: EmotionStatListProps) => {
  return (
    <StatList>
      {stats.map((stat, index) => (
        <EmotionStatItem key={index}>
          <EmojiText>{stat.emoji}</EmojiText>
          <EmotionCount>{stat.count}</EmotionCount>
          <EmotionLabel>{stat.label}</EmotionLabel>
        </EmotionStatItem>
      ))}
    </StatList>
  );
};

export default EmotionStatList;

const StatList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 90px;
  margin-top: 16px;
  padding: 1.2rem;
`;

const EmotionStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
`;

const EmojiText = styled.div`
  font-size: 24px;
`;

const EmotionCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #111;
  margin-top: 8px;
`;

const EmotionLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;
