// home
export const recentPosts = [
  {
    id: 1,
    emotion: 'HAPPY',
    date: '2025.05.05 (월요일)',
    content:
      '오늘 하루는 날씨가 좋아서 기분이 좋았어요. 친구들과 만나 오랜만에 이야기를 나눴습니다.',
    imageUrl: '',
  },
  {
    id: 2,
    emotion: 'HAPPY',
    date: '2025.05.04 (일요일)',
    content: '주말이라 푹 쉬었어요. 산책도 하고 영화도 봤습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    emotion: 'HAPPY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl: '',
  },
  {
    id: 4,
    emotion: 'HAPPY',
    date: '2025.05.02 (금요일)',
    content: '회사에서 바빴지만 뿌듯한 하루였어요.',
    imageUrl: '',
  },
] as const;

export const digests = [
  {
    id: 1,
    dateText: '2025년 5월',
    title: '5월 다이제스트',
    content:
      '이번 달은 새로운 시작과 함께 많은 변화가 있었어요. 특히 주말에 자주 외출하며 활동적인 시간을 보냈습니다.',
    monthPath: '2025-05',
    imageUrl: '',
  },
  {
    id: 2,
    dateText: '2025년 4월',
    title: '4월 다이제스트',
    content:
      '꽃이 피는 계절을 맞아 나들이가 많았고, 기분 좋은 일들이 많았어요.',
    monthPath: '2025-04',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
];

export const pastPosts = [
  {
    id: 1,
    emotion: 'HAPPY',
    date: '2025.05.05 (월요일)',
    content:
      '오늘 하루는 날씨가 좋아서 기분이 좋았어요. 친구들과 만나 오랜만에 이야기를 나눴습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    emotion: 'SAD',
    date: '2025.05.04 (일요일)',
    content: '주말이라 푹 쉬었어요. 산책도 하고 영화도 봤습니다.',
    imageUrl: '',
  },
  {
    id: 3,
    emotion: 'JOY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    emotion: 'HAPPY',
    date: '2025.05.02 (금요일)',
    content: '회사에서 바빴지만 뿌듯한 하루였어요.',
    imageUrl: '',
  },
  {
    id: 5,
    emotion: 'NEUTRAL',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    emotion: 'HAPPY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl: '',
  },
  {
    id: 7,
    emotion: 'JOY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl: '',
  },
  {
    id: 8,
    emotion: 'HAPPY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    emotion: 'SAD',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl: '',
  },
  {
    id: 10,
    emotion: 'HAPPY',
    date: '2025.05.03 (토요일)',
    content: '카페에 가서 책을 읽으며 여유로운 하루를 보냈습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
] as const;

export const postDetail = {
  id: 1,
  date: '2025-05-05',
  emotion: 'HAPPY',
  content: '오늘은 좋은 하루였어요! 하루 종일 산책을 했습니다.',
  location: '서울시 성북구',
  imageUrl: [
    'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  ],
  tags: ['카페', '친구', '산책'],
  questions: [
    {
      question: '오늘 기분이 어땠나요?',
      answer: '매우 좋았어요!',
    },
    {
      question: '오늘 기억에 남는 일이 있었나요??',
      answer: '카페에 갔어요!',
    },
  ],
};

export const pastDigests = [
  {
    id: 1,
    dateText: '2025년 5월',
    title: '5월 다이제스트',
    content:
      '이번 달은 새로운 시작과 함께 많은 변화가 있었어요. 특히 주말에 자주 외출하며 활동적인 시간을 보냈습니다.',
    monthPath: '2025-05',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    dateText: '2025년 4월',
    title: '4월 다이제스트',
    content:
      '꽃이 피는 계절을 맞아 나들이가 많았고, 기분 좋은 일들이 많았어요.',
    monthPath: '2025-04',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    dateText: '2025년 3월',
    title: '3월 다이제스트',
    content:
      '꽃이 피는 계절을 맞아 나들이가 많았고, 기분 좋은 일들이 많았어요.',
    monthPath: '2025-03',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    dateText: '2025년 2월',
    title: '2월 다이제스트',
    content:
      '꽃이 피는 계절을 맞아 나들이가 많았고, 기분 좋은 일들이 많았어요.',
    monthPath: '2025-02',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    dateText: '2025년 1월',
    title: '1월 다이제스트',
    content:
      '꽃이 피는 계절을 맞아 나들이가 많았고, 기분 좋은 일들이 많았어요.',
    monthPath: '2025-01',
    imageUrl:
      'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
  },
];
