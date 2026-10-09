'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Library, Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { authorShelves, books, seriesShelves, won } from '@/lib/books';

type Cart = Record<number, number>;
const formats = ['전체 형식', '종이책', 'POD', '전자책'] as const;
const featured = books[0];

export default function Home() {
  const [format, setFormat] = useState<(typeof formats)[number]>('전체 형식');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [cartNotice, setCartNotice] = useState('');
  const [ready, setReady] = useState(false);
  const [socialNotice, setSocialNotice] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem('dodid-cart');
    if (saved) setCart(JSON.parse(saved) as Cart);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem('dodid-cart', JSON.stringify(cart));
  }, [cart, ready]);

  const visibleBooks = useMemo(() => {
    const word = query.trim().toLowerCase();
    return books.filter((book) => (format === '전체 형식' || book.format === format)
      && (!word || `${book.title} ${book.author} ${book.translator ?? ''}`.toLowerCase().includes(word)));
  }, [format, query]);

  const cartLines = books.filter((book) => cart[book.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = cartLines.reduce((sum, book) => sum + book.price * cart[book.id], 0);

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    setCheckout(false);
    setCartOpen(true);
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCartNotice('온라인 결제 시스템 연결을 마치면 이 주문서에서 바로 결제할 수 있습니다.');
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = (current[id] ?? 0) + amount;
      if (next <= 0) {
        const copy = { ...current };
        delete copy[id];
        return copy;
      }
      return { ...current, [id]: next };
    });
  }

  return (
    <main>
      <div className="shop-notice"><span>도서출판 도디드 공식 온라인 서점</span><span>출간 도서 약 140권 · 한 권씩 등록 중</span></div>

      <header className="shop-header">
        <a className="shop-wordmark" href="#top">DODID <span>BOOKS</span></a>
        <label className="search-box"><Search /><span className="sr-only">도서 검색</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="책 제목·저자·역자 검색" /></label>
        <button className="cart-trigger" onClick={() => { setCheckout(false); setCartOpen(true); }} aria-label={`장바구니 ${cartCount}개`}><ShoppingBag /><span>장바구니</span><b>{cartCount}</b></button>
      </header>

      <nav className="category-nav" aria-label="서점 메뉴">
        <a href="#authors">저자별 서가</a><a href="#series">출간 시리즈</a><a href="#shop">전체 도서</a><a href="#about">출판사 소개</a><a href="#social">SNS</a>
      </nav>

      <section className="store-hero collection-hero" id="top">
        <div className="hero-copy">
          <span className="new-label">DODID ARCHIVE</span><p className="hero-kicker">한 권씩 채워 가는 도디드의 서가</p>
          <h1>저자와 시리즈로 만나는<br />도디드의 140권</h1>
          <p>청교도 고전부터 성경·신학 연구서까지, 출간 도서를 저자별·시리즈별로 차례로 등록합니다.</p>
          <div className="hero-actions"><a className="hero-primary" href="#authors">저자별 서가 보기 <ArrowRight /></a><a href="#shop">등록 도서 보기</a></div>
        </div>
        <div className="hero-book-stage">
          <span className="stage-note">첫 번째 등록 도서</span>
          <Link className="featured-cover" href={`/books/${featured.id}`}><img src="/covers/gospels-3d.png" alt={`${featured.title} 입체 표지`} /></Link>
          <div className="stage-caption"><strong>{featured.title}</strong><span>{featured.author} 지음 · {featured.translator} 옮김</span></div>
        </div>
      </section>

      <section className="library-stats" aria-label="도서 등록 현황">
        <div><strong>약 140권</strong><span>도디드 출간 도서</span></div>
        <div><strong>약 50권</strong><span>아더 핑크 도서</span></div>
        <div><strong>{books.length}권</strong><span>현재 상세 등록</span></div>
      </section>

      <section className="shelf-section" id="authors">
        <div className="shop-title-row"><div><p>AUTHOR SHELVES</p><h2>저자별 서가</h2></div><span>저자를 선택하면 그 저자의 출간 도서를 한곳에서 볼 수 있습니다.</span></div>
        <div className="author-shelf-grid">
          {authorShelves.map((shelf) => <article className={`author-shelf ${shelf.accent}`} key={shelf.name}>
            <div className="shelf-icon"><Library /></div><p>{shelf.eyebrow}</p><h3>{shelf.name}</h3><span>{shelf.note}</span>
            <div className="shelf-count"><strong>{shelf.registered > 0 ? `${shelf.registered}권 등록` : '등록 준비 중'}</strong><em>{shelf.planned}</em></div>
            {shelf.registered > 0 ? <a href="#shop">등록 도서 보기 <ArrowRight /></a> : <small>도서를 차례로 추가합니다</small>}
          </article>)}
        </div>
      </section>

      <section className="series-section" id="series">
        <div className="series-copy"><p>INSTITUTE & SERIES</p><h2>기관·출간 시리즈별 서가</h2><span>연구원과 기획 시리즈의 성격을 살려 관련 도서를 함께 소개합니다.</span></div>
        {seriesShelves.map((series) => <article className="series-card" key={series.name}><div><BookOpen /></div><section><p>{series.eyebrow}</p><h3>{series.name}</h3><span>{series.note}</span></section><strong>{series.registered > 0 ? `${series.registered}권` : '순차 등록 예정'}</strong></article>)}
      </section>

      <section className="benefits" aria-label="구매 안내">
        <div><PackageCheck /><span><strong>출판사 직배송</strong>도디드가 직접 준비합니다</span></div>
        <div><ShieldCheck /><span><strong>자체 판매 구조</strong>외부 서점 이동 없이 주문합니다</span></div>
        <div><BookOpen /><span><strong>종이책 중심</strong>POD·전자책은 별도로 표시합니다</span></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="shop-title-row"><div><p>DODID BOOKS</p><h2>현재 등록된 책</h2></div><span>표지를 누르면 책 소개·목차·도서정보를 볼 수 있습니다.</span></div>
        <div className="shop-controls"><div className="subject-tabs"><button className="active">전체 도서</button><button>청교도</button><button>성경</button><button>신학</button></div><div className="control-selects"><select value={format} onChange={(event) => setFormat(event.target.value as (typeof formats)[number])} aria-label="책 형식">{formats.map((item) => <option key={item}>{item}</option>)}</select></div></div>
        <div className="result-line"><strong>{visibleBooks.length}</strong>개의 도서가 상세 등록되었습니다.</div>
        <div className="product-grid one-book-grid">
          {visibleBooks.map((book) => <article className="product-card" key={book.id}>
            <div className="product-cover"><span className="new-badge">첫 등록</span><Link href={`/books/${book.id}`}><img src={book.image} alt={`${book.title} 표지`} /></Link><button onClick={() => addToCart(book.id)}><ShoppingBag /> 장바구니 담기</button></div>
            <div className="product-copy"><div className="product-tags"><span>{book.subject}</span><span>{book.format}</span></div><Link href={`/books/${book.id}`}><h3>{book.title}</h3></Link><p>{book.author} 지음 · {book.translator} 옮김</p><strong>{won.format(book.price)}원</strong></div>
          </article>)}
        </div>
        {visibleBooks.length === 0 && <div className="no-results">검색 조건에 맞는 등록 도서가 없습니다.</div>}
      </section>

      <section className="about-shop" id="about"><p>ABOUT DODID</p><h2>말씀과 신앙의 유산을<br />한 권의 책으로 전합니다.</h2><span>도디드는 청교도 고전, 성경 연구, 바른 신학의 깊이를 오늘의 독자에게 전하는 출판사입니다. 약 140권의 출간 목록을 이 서가에 차례로 정리합니다.</span><a href="#authors">저자별 서가 보기 <ArrowRight /></a></section>

      <section className="social-section" id="social"><div><p>FOLLOW DODID</p><h2>도디드의 새로운 소식을 만나세요.</h2></div><div className="social-links"><button onClick={() => setSocialNotice('인스타그램 공식 주소를 보내주시면 연결됩니다.')}><span className="social-letter">I</span> Instagram</button><button onClick={() => setSocialNotice('유튜브 공식 채널 주소를 보내주시면 연결됩니다.')}><span className="social-letter">▶</span> YouTube</button><button onClick={() => setSocialNotice('페이스북 공식 페이지 주소를 보내주시면 연결됩니다.')}><span className="social-letter">f</span> Facebook</button></div>{socialNotice && <p className="social-message">{socialNotice}</p>}</section>

      <footer><div className="footer-brand">DODID <span>BOOKS</span></div><div className="footer-copy"><strong>도서출판 도디드</strong><p>청교도 · 성경 · 신학 전문 출판사</p><span>약 140권의 출간 도서를 순차 등록하고 있습니다.</span></div><div className="footer-menu"><a href="#authors">저자별 서가</a><a href="#series">출간 시리즈</a><a href="#shop">전체 도서</a></div><p className="copyright">© 2026 DODID PUBLISHING. ALL RIGHTS RESERVED.</p></footer>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="cart-sheet"><SheetHeader className="cart-head"><SheetTitle>{checkout ? '주문서 작성' : '장바구니'}</SheetTitle><SheetDescription>{checkout ? '배송 정보와 연락처를 입력해 주세요.' : `선택한 도서 ${cartCount}권`}</SheetDescription></SheetHeader>
          {!checkout && <div className="cart-body">{cartLines.length === 0 ? <div className="empty-cart"><ShoppingBag /><p>장바구니가 비어 있습니다.</p><span>도디드의 책을 담아보세요.</span></div> : cartLines.map((book) => <div className="cart-line" key={book.id}><img src={book.image} alt="" /><div className="cart-line-copy"><Link href={`/books/${book.id}`}>{book.title}</Link><span>{won.format(book.price)}원 · {book.format}</span><div className="quantity"><button onClick={() => changeQuantity(book.id, -1)} aria-label="수량 줄이기"><Minus /></button><span>{cart[book.id]}</span><button onClick={() => changeQuantity(book.id, 1)} aria-label="수량 늘리기"><Plus /></button></div></div><button className="remove-line" onClick={() => changeQuantity(book.id, -cart[book.id])} aria-label="상품 삭제"><Trash2 /></button></div>)}</div>}
          {checkout && <form className="checkout-form" onSubmit={submitOrder}><label>이름<input required name="name" placeholder="주문자 이름" /></label><label>휴대전화<input required name="phone" inputMode="tel" placeholder="010-0000-0000" /></label><label>이메일<input required name="email" type="email" placeholder="example@email.com" /></label><label>배송 주소<input required name="address" placeholder="주소를 입력해 주세요" /></label><label>배송 메모<textarea name="memo" rows={3} placeholder="배송 시 요청사항" /></label><div className="payment-pending"><ShieldCheck /><span><strong>온라인 결제 연결 대기 중</strong>도디드 명의의 PG 가입 정보가 등록되면 카드 결제가 활성화됩니다.</span></div>{cartNotice && <p className="order-notice">{cartNotice}</p>}<Button type="submit">결제 연결 상태 확인</Button><button type="button" className="back-to-cart" onClick={() => setCheckout(false)}>← 장바구니로 돌아가기</button></form>}
          {!checkout && cartLines.length > 0 && <SheetFooter className="cart-footer"><div className="total-line"><span>상품 합계</span><strong>{won.format(subtotal)}원</strong></div><p>배송비와 결제 수단은 판매자 정보 등록 후 확정됩니다.</p><Button onClick={() => { setCheckout(true); setCartNotice(''); }}>주문서 작성 <ArrowRight /></Button></SheetFooter>}
        </SheetContent>
      </Sheet>
    </main>
  );
}

