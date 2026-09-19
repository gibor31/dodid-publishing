export type Subject = '청교도' | '성경' | '신학';
export type BookFormat = '종이책' | 'POD' | '전자책';

export type Book = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  price: number;
  subject: Subject;
  format: BookFormat;
  date: string;
  image: string;
  isNew?: boolean;
};

export const books: Book[] = [
  {
    id: 1,
    title: '아더 핑크의 사복음서',
    subtitle: '사복음서를 한 분 그리스도의 빛 아래 읽는 고전',
    description: '사복음서에 기록된 예수 그리스도의 사역과 말씀을 깊이 살피도록 돕는 책입니다. 복음서의 각 장면을 신앙의 눈으로 천천히 읽고 묵상하려는 독자에게 권합니다.',
    author: '아더 핑크 · 윤득남 옮김',
    price: 10800,
    subject: '성경',
    format: '종이책',
    date: '2023.10.01',
    image: '/covers/gospels.jpg',
  },
  {
    id: 2,
    title: '아더 핑크의 하나님의 속성들',
    subtitle: '하나님의 성품을 깊이 살피는 신학 고전',
    description: '하나님의 여러 속성을 성경을 따라 차분하게 설명하는 신학 고전입니다. 하나님을 더 바르게 알고 믿음의 기초를 단단히 세우고 싶은 독자를 위한 책입니다.',
    author: '아더 핑크',
    price: 11000,
    subject: '신학',
    format: 'POD',
    date: '2025.10.25',
    image: '/covers/attributes.jpg',
    isNew: true,
  },
  {
    id: 3,
    title: '천국과 지옥의 환상들',
    subtitle: '존 번연이 전하는 천국과 지옥에 관한 묵상',
    description: '청교도 작가 존 번연의 글을 통해 영원과 구원, 천국과 지옥을 진지하게 생각하도록 이끄는 책입니다. 삶과 믿음의 방향을 되돌아보게 하는 고전적 신앙 문헌입니다.',
    author: '존 번연',
    price: 8000,
    subject: '청교도',
    format: 'POD',
    date: '2026.02.05',
    image: '/covers/heaven-hell.jpg',
    isNew: true,
  },
  {
    id: 4,
    title: 'J. C. 필폿의 설교집 01',
    subtitle: '말씀의 깊이를 따라가는 고전 설교 모음',
    description: '성경 본문을 삶과 신앙의 현실에 연결해 전하는 J. C. 필폿의 설교를 모았습니다. 오래된 설교가 오늘의 독자에게 건네는 진지한 권면을 만날 수 있습니다.',
    author: 'J. C. 필폿',
    price: 13000,
    subject: '청교도',
    format: 'POD',
    date: '2025.06.20',
    image: '/covers/philpot-sermons.jpg',
  },
  {
    id: 5,
    title: '마틴 루터의 베드로서신 및 유다서',
    subtitle: '베드로서신과 유다서를 읽는 종교개혁자의 시선',
    description: '마틴 루터가 베드로서신과 유다서를 해설한 글을 통해 종교개혁의 성경 이해를 만납니다. 본문을 깊이 읽고 믿음의 실천을 생각하도록 돕습니다.',
    author: '마틴 루터',
    price: 9000,
    subject: '성경',
    format: '전자책',
    date: '2024.11.01',
    image: '/covers/luther-epistles.jpg',
  },
  {
    id: 6,
    title: '하나님의 선택 1',
    subtitle: '선택의 교리를 차분하고 명료하게 풀어낸 책',
    description: '성경이 말하는 하나님의 선택을 중심으로 구원 교리의 핵심을 살펴봅니다. 어려운 주제를 차근차근 읽고 이해하려는 독자를 위한 신학 도서입니다.',
    author: '아더 핑크',
    price: 3600,
    subject: '신학',
    format: '전자책',
    date: '2021.12.29',
    image: '/covers/divine-choice.jpg',
  },
];

export const won = new Intl.NumberFormat('ko-KR');

