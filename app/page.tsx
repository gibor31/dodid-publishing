'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Book = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  price: number;
  tag: '종이책' | 'POD' | 'eBook';
  date: string;
  image: string;
  url: string;
};

const books: Book[] = [
  {
    id: 1,
    title: '아더 핑크의 사복음서',
    subtitle: '20세기 마지막 청교도 아더 핑크 시리즈 4',
    author: '아더 핑크 · 윤득남 옮김',
    price: 10800,
    tag: '종이책',
    date: '2023.10.01',
    image: '/covers/gospels.jpg',
    url: 'https://product.kyobobook.co.kr/detail/S000209151576',
  },
  {
    id: 2,
    title: '아더 핑크의 하나님의 속성들',
    subtitle: '하나님의 성품을 깊이 살피는 신학 고전',
    author: '아더 핑크',
    price: 11000,
    tag: 'POD',
    date: '2025.10.25',
    image: '/covers/attributes.jpg',
    url: 'https://product.kyobobook.co.kr/detail/S000217211434',
  },
  {
    id: 3,
    title: '천국과 지옥의 환상들',
    subtitle: '존 번연이 전하는 천국과 지옥에 관한 묵상',
    author: '존 번연',
    price: 8000,
    tag: 'POD',
    date: '2026.02.05',
    image: '/covers/heaven-hell.jpg',
    url: 'https://product.kyobobook.co.kr/detail/S000218367900',
  },
  {
    id: 4,
    title: 'J. C. 필폿의 설교집 01',
    subtitle: '말씀의 깊이를 따라가는 고전 설교 모음',
    author: 'J. C. 필폿',
    price: 13000,
    tag: 'POD',
    date: '2025.06.20',
    image: '/covers/philpot-sermons.jpg',
    url: 'https://product.kyobobook.co.kr/detail/S000216558498',
  },
  {
    id: 5,
    title: '마틴 루터의 베드로서신 및 유다서',
    subtitle: '베드로서신과 유다서를 읽는 종교개혁자의 시선',
    author: '마틴 루터',
    price: 9000,
    tag: 'eBook',
    date: '2024.11.01',
    image: '/covers/luther-epistles.jpg',
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000008885275',
  },
  {
    id: 6,
    title: '하나님의 선택 1',
    subtitle: '선택의 교리를 차분하고 명료하게 풀어낸 책',
    author: '아더 핑크',
    price: 3600,
    tag: 'eBook',
    date: '2021.12.29',
    image: '/covers/divine-choice.jpg',
    url: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000003599604',
  },
];

const won = new Intl.NumberFormat('ko-KR');
const kyoboSearch = 'https://search.kyobobook.co.kr/search?keyword=%EB%8F%84%EB%94%94%EB%93%9C';

export default function Home() {
  const [category, setCategory] = useState('전체');
  const visibleBooks = category === '전체' ? books : books.filter((book) => book.tag === category);

  return (
    <main>
      <div className="announcement">
        <span>도디드 공식 온라인 서점</span>
        <span className="announcement-dot" />
        <span>교보문고에서 안전하게 구매하세요</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="도디드 홈">
          DODID <span>도서출판 도디드</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#books">책</a>
          <a href="#story">도디드</a>
          <a href="#letter">소식</a>
        </nav>
        <div className="header-actions">
          <Button variant="ghost" size="icon" aria-label="책 검색"><Search /></Button>
          <a className="kyobo-header-link" href={kyoboSearch} target="_blank" rel="noreferrer">
            교보문고 전체보기 <ArrowUpRight />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <img src="/dodid-hero.png" alt="따뜻한 햇살 아래 놓인 여러 권의 책" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">BOOKS FOR A DEEPER DAY</p>
          <h1>오래 남는 문장을<br />만듭니다.</h1>
          <p className="hero-description">
            도디드는 오래 읽힐 고전과 깊이 있는 신앙 도서를 펴냅니다.<br className="desktop-break" />
            실제 출간 도서를 살펴보고 교보문고에서 바로 만나보세요.
          </p>
          <a className="hero-link" href="#books">도디드의 책 보기 <ArrowDown /></a>
        </div>
      </section>

      <section className="book-section" id="books">
        <div className="section-heading">
          <div><p className="eyebrow vermilion">DODID BOOKS</p><h2>지금, 도디드의 책</h2></div>
          <p>교보문고에서 판매 중인 도디드의 대표 도서입니다.<br />상품 정보와 가격은 교보문고 기준입니다.</p>
        </div>

        <div className="filters" aria-label="도서 분류">
          {['전체', '종이책', 'POD', 'eBook'].map((item) => (
            <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
          ))}
          <a className="catalog-link" href={kyoboSearch} target="_blank" rel="noreferrer">전체 도서 검색 <ArrowUpRight /></a>
        </div>

        <div className="book-grid real-books">
          {visibleBooks.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="cover-wrap">
                <img className="book-cover-image" src={book.image} alt={`${book.title} 표지`} />
                <a className="quick-add" href={book.url} target="_blank" rel="noreferrer">
                  교보문고에서 구매 <ArrowUpRight />
                </a>
              </div>
              <div className="book-info">
                <div className="book-label-line"><span>{book.tag}</span><time>{book.date}</time></div>
                <h3>{book.title}</h3>
                <p>{book.subtitle}</p>
                <div className="book-meta-line"><small>{book.author}</small><strong>{won.format(book.price)}원</strong></div>
              </div>
            </article>
          ))}
        </div>

        <div className="all-books-callout">
          <p>도디드의 책은 교보문고에서 더 많이 만나볼 수 있습니다.</p>
          <a href={kyoboSearch} target="_blank" rel="noreferrer">교보문고에서 도디드 전체 검색 <ArrowRight /></a>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-mark">ㄷ</div>
        <div className="story-copy">
          <p className="eyebrow">WHY DODID</p>
          <h2>시간을 견디는 책의<br />가치를 믿습니다.</h2>
          <p>도디드는 고전 문학과 신앙의 깊이를 오늘의 독자에게 전합니다. 오래전에 쓰였지만 지금도 유효한 질문, 삶과 믿음을 단단하게 하는 문장을 정성껏 책으로 엮습니다.</p>
          <a href="#letter">도디드 소식 받기 <ArrowRight /></a>
        </div>
        <div className="principles">
          {[['01', '오래 읽히는 고전'], ['02', '깊이 있는 신앙과 사유'], ['03', '독자와 만나는 새로운 방식']].map(([number, text]) => (
            <div key={number}><span>{number}</span><strong>{text}</strong><Check /></div>
          ))}
        </div>
      </section>

      <section className="letter-section" id="letter">
        <p className="eyebrow">DODID LETTER</p>
        <h2>새로운 책의 첫 문장을<br />가장 먼저 만나보세요.</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="email">이메일 주소</label>
          <input id="email" type="email" placeholder="이메일 주소" required />
          <Button type="submit">구독하기 <ArrowRight /></Button>
        </form>
        <p>신간과 도디드의 책 이야기를 정성껏 보내드립니다.</p>
      </section>

      <footer>
        <div className="footer-wordmark">DODID</div>
        <div className="footer-info"><strong>도서출판 도디드</strong><p>교보문고에서 도디드의 종이책과 전자책을 구매하실 수 있습니다.</p><span>상품 주문·결제·배송은 교보문고에서 진행됩니다.</span></div>
        <div className="footer-links"><a href="#books">도서목록</a><a href="#story">출판사 소개</a><a href={kyoboSearch} target="_blank" rel="noreferrer">교보문고</a></div>
        <p className="copyright">© 2026 DODID PUBLISHING. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}

