export type Subject = '청교도' | '성경' | '신학';
export type BookFormat = '종이책' | 'POD' | '전자책';

export type Book = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  translator?: string;
  price: number;
  subject: Subject;
  format: BookFormat;
  date: string;
  image: string;
  gallery: string[];
  isbn13: string;
  pages: number;
  size: string;
  series?: string;
  contents: string[];
  isNew?: boolean;
};

export const books: Book[] = [
  {
    id: 1,
    title: '아더 핑크의 사복음서',
    subtitle: '네 명의 복음전도자가 그리는 예수 그리스도의 참된 인격과 아름다움',
    description: '마태·마가·누가·요한복음의 서로 다른 특징과 강조점을 한 분 예수 그리스도의 빛 아래 살피는 성경 연구서입니다. 네 복음서가 각각 어떻게 그리스도를 증언하는지 비교하며 읽을 수 있도록 안내합니다.',
    author: '아더 핑크',
    translator: '윤득남',
    price: 12000,
    subject: '성경',
    format: '종이책',
    date: '2023.10.01',
    image: '/covers/gospels-godpeople.jpg',
    gallery: ['/covers/gospels-3d.png', '/covers/gospels-godpeople.jpg'],
    isbn13: '9791171000067',
    pages: 216,
    size: '152 × 225 × 20 mm',
    series: '20세기 마지막 청교도 아더 핑크 시리즈 4',
    contents: [
      '머리말',
      '제1장 마태복음',
      '제2장 마가복음',
      '제3장 누가복음',
      '제4장 요한복음',
      '제5장 결론',
    ],
  },
];

export const authorShelves = [
  {
    name: '아더 핑크',
    eyebrow: 'PURITAN & REFORMED CLASSICS',
    note: '약 50권의 도디드 출간 도서를 차례로 소개합니다.',
    registered: books.filter((book) => book.author === '아더 핑크').length,
    planned: '약 50권',
    accent: 'plum',
  },
  {
    name: '이정철 목사',
    eyebrow: 'KOREAN AUTHORS',
    note: '이정철 목사의 저작을 한 서가에서 만날 수 있도록 준비합니다.',
    registered: 0,
    planned: '순차 등록',
    accent: 'green',
  },
  {
    name: '윤득남',
    eyebrow: 'KOREAN AUTHORS & TRANSLATORS',
    note: '저서와 번역서를 함께 살펴볼 수 있는 저자 서가입니다.',
    registered: 0,
    planned: '순차 등록',
    accent: 'sand',
  },
] as const;

export const seriesShelves = [
  {
    name: '마르튀스 원어성경연구원 시리즈',
    eyebrow: 'BIBLICAL LANGUAGES',
    note: '마르튀스 원어성경연구원에서 출간하는 원어성경 연구 도서를 한데 모읍니다.',
    registered: 0,
  },
] as const;

export const won = new Intl.NumberFormat('ko-KR');

