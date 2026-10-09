import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '도서출판 도디드 | 저자별로 만나는 청교도·성경·신학 서점',
  description: '약 140권의 도디드 출간 도서를 저자별·시리즈별로 만나는 공식 온라인 서점입니다. 아더 핑크, 국내 저자, 마르튀스 원어성경연구원 시리즈를 차례로 소개합니다.',
  openGraph: {
    title: '도서출판 도디드',
    description: '약 140권의 출간 도서를 저자별·시리즈별로 만나는 도디드 공식 온라인 서점',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '도서출판 도디드' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '도서출판 도디드',
    description: '약 140권의 출간 도서를 저자별·시리즈별로 만나는 도디드 공식 온라인 서점',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

