'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Check, Minus, Plus, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type Book = { id: number; title: string; subtitle: string; author: string; price: number; tag: string; color: string; textColor: string };

const books: Book[] = [
  { id: 1, title: '아직 쓰이지 않은 문장', subtitle: '마음을 오래 들여다보는 산문', author: '김도윤', price: 16800, tag: '신간', color: '#d84a2e', textColor: '#fff8ee' },
  { id: 2, title: '밤의 도서관', subtitle: '어둠 속에서 만난 열두 권의 책', author: '정해인', price: 18000, tag: '에세이', color: '#193c34', textColor: '#f4ead7' },
  { id: 3, title: '작은 것들의 이름', subtitle: '매일의 풍경을 기록하는 법', author: '이서윤', price: 15500, tag: '인문', color: '#d8cbb4', textColor: '#27241f' },
  { id: 4, title: '혼자 걷는 사람', subtitle: '도시의 가장자리에서', author: '박정우', price: 17500, tag: '문학', color: '#242424', textColor: '#f3eee4' },
  { id: 5, title: '다정한 질문들', subtitle: '서로를 이해하기 위한 대화', author: '한유리', price: 16200, tag: '에세이', color: '#6f7755', textColor: '#fffdf5' },
  { id: 6, title: '페이지를 넘기는 마음', subtitle: '책을 만들고 읽는 시간', author: '도디드 편집부', price: 19000, tag: '도디드', color: '#ece5d8', textColor: '#b83a25' },
];

const won = new Intl.NumberFormat('ko-KR');

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [category, setCategory] = useState('전체');
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = useMemo(() => books.reduce((sum, book) => sum + book.price * (cart[book.id] ?? 0), 0), [cart]);
  const visibleBooks = category === '전체' ? books : books.filter((book) => book.tag === category);

  function addBook(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + amount);
      const updated = { ...current, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  }

  return (
    <main>
      <div className="announcement"><span>도디드 온라인 서점 준비 중</span><span className="announcement-dot" /><span>3만원 이상 무료배송</span></div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="도디드 홈">DODID <span>도서출판 도디드</span></a>
        <nav aria-label="주요 메뉴"><a href="#books">책</a><a href="#story">도디드</a><a href="#letter">소식</a></nav>
        <div className="header-actions">
          <Button variant="ghost" size="icon" aria-label="책 검색"><Search /></Button>
          <Sheet>
            <SheetTrigger render={<Button className="cart-button" aria-label={`장바구니 ${cartCount}권`} />}>
              <ShoppingBag /><span>장바구니</span><b>{cartCount}</b>
            </SheetTrigger>
            <SheetContent className="cart-sheet">
              <SheetHeader className="cart-head"><SheetTitle>장바구니</SheetTitle><SheetDescription>도디드의 책을 한 번에 받아보세요.</SheetDescription></SheetHeader>
              <div className="cart-body">
                {cartCount === 0 ? (
                  <div className="empty-cart"><BookOpen /><p>아직 담긴 책이 없습니다.</p><span>마음이 머무는 책을 골라보세요.</span></div>
                ) : books.filter((book) => cart[book.id]).map((book) => (
                  <div className="cart-line" key={book.id}>
                    <div className="mini-cover" style={{ background: book.color, color: book.textColor }}>{book.title.slice(0, 2)}</div>
                    <div className="cart-line-copy">
                      <strong>{book.title}</strong><span>{won.format(book.price)}원</span>
                      <div className="quantity">
                        <button onClick={() => changeQuantity(book.id, -1)} aria-label={`${book.title} 수량 줄이기`}><Minus /></button>
                        <span>{cart[book.id]}</span>
                        <button onClick={() => changeQuantity(book.id, 1)} aria-label={`${book.title} 수량 늘리기`}><Plus /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <SheetFooter className="cart-footer">
                <div className="delivery-line"><span>배송비</span><strong>{total >= 30000 ? '무료' : '3,000원'}</strong></div>
                <div className="total-line"><span>합계</span><strong>{won.format(total + (total > 0 && total < 30000 ? 3000 : 0))}원</strong></div>
                <Button className="checkout-button" disabled={cartCount === 0}>주문서 작성하기 <ArrowRight /></Button>
                <p className="checkout-note">실제 결제는 도서 정보와 결제 서비스를 연결한 뒤 활성화됩니다.</p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="hero" id="top">
        <img src="/dodid-hero.png" alt="따뜻한 햇살 아래 놓인 여러 권의 책" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">BOOKS FOR A DEEPER DAY</p>
          <h1>오래 남는 문장을<br />만듭니다.</h1>
          <p className="hero-description">도디드는 오늘을 천천히 들여다보게 하는 책,<br className="desktop-break" /> 한 사람의 하루에 조용히 스며드는 책을 만듭니다.</p>
          <a className="hero-link" href="#books">도디드의 책 보기 <ArrowDown /></a>
        </div>
      </section>

      <section className="book-section" id="books">
        <div className="section-heading">
          <div><p className="eyebrow vermilion">DODID BOOKS</p><h2>지금, 도디드의 책</h2></div>
          <p>문학과 인문, 에세이 사이에서<br /> 오래 곁에 둘 문장을 고릅니다.</p>
        </div>
        <div className="filters" aria-label="도서 분류">
          {['전체', '신간', '문학', '에세이', '인문'].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <p className="sample-notice">아래 도서명과 표지는 사이트 구성을 보여드리기 위한 샘플입니다.</p>
        <div className="book-grid">
          {visibleBooks.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="cover-wrap">
                <div className="book-cover" style={{ background: book.color, color: book.textColor }}><span className="cover-publisher">DODID</span><h3>{book.title}</h3><span className="cover-author">{book.author}</span></div>
                <button className="quick-add" onClick={() => addBook(book.id)}><Plus /> 장바구니 담기</button>
              </div>
              <div className="book-info"><span>{book.tag}</span><h3>{book.title}</h3><p>{book.subtitle}</p><div><small>{book.author}</small><strong>{won.format(book.price)}원</strong></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-mark">ㄷ</div>
        <div className="story-copy">
          <p className="eyebrow">WHY DODID</p><h2>책이 사람과 사람 사이를<br />잇는다고 믿습니다.</h2>
          <p>빠르게 소비되는 말보다 오래 곁에 머무는 문장을 생각합니다. 작가의 목소리를 가장 온전한 형태로 독자에게 전하는 것, 그것이 도디드가 책을 만드는 방식입니다.</p>
          <a href="#letter">도디드 이야기 읽기 <ArrowRight /></a>
        </div>
        <div className="principles">
          {[['01', '천천히 읽을 가치'], ['02', '작가의 고유한 목소리'], ['03', '손에 오래 남는 만듦새']].map(([number, text]) => <div key={number}><span>{number}</span><strong>{text}</strong><Check /></div>)}
        </div>
      </section>

      <section className="letter-section" id="letter">
        <p className="eyebrow">DODID LETTER</p><h2>새로운 책의 첫 문장을<br />가장 먼저 만나보세요.</h2>
        <form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">이메일 주소</label><input id="email" type="email" placeholder="이메일 주소" required /><Button type="submit">구독하기 <ArrowRight /></Button></form>
        <p>월 1–2회, 신간과 작가 이야기만 정성껏 보내드립니다.</p>
      </section>

      <footer>
        <div className="footer-wordmark">DODID</div>
        <div className="footer-info"><strong>도서출판 도디드</strong><p>사업자 정보 · 통신판매업 정보 · 주소 · 연락처</p><span>실제 운영 정보를 전달해주시면 등록해드립니다.</span></div>
        <div className="footer-links"><a href="#books">도서목록</a><a href="#story">출판사 소개</a><a href="#letter">문의</a></div>
        <p className="copyright">© 2026 DODID PUBLISHING. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
