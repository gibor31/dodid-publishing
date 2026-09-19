import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '도서출판 도디드 | 청교도·성경·신학 온라인 서점',
  description: '청교도 고전과 성경·신학 도서를 직접 살펴보고 장바구니에 담는 도서출판 도디드 공식 온라인 서점입니다.',
  openGraph: {
    title: '도서출판 도디드',
    description: '청교도·성경·신학 전문 도서출판 도디드 공식 온라인 서점',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '도서출판 도디드' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '도서출판 도디드',
    description: '청교도·성경·신학 전문 도서출판 도디드 공식 온라인 서점',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

