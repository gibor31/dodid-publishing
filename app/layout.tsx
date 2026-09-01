import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '도서출판 도디드 | 오래 남는 문장을 만듭니다',
  description: '오늘을 천천히 들여다보게 하는 책을 만드는 도서출판 도디드의 온라인 서점입니다.',
  openGraph: {
    title: '도서출판 도디드',
    description: '오래 남는 문장을 만듭니다.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '도서출판 도디드' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '도서출판 도디드',
    description: '오래 남는 문장을 만듭니다.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
