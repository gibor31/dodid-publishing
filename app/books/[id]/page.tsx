'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Check, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { books, won } from '@/lib/books';

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const book = books.find((item) => item.id === Number(params.id));
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  if (!book) return <main className="not-found"><h1>도서를 찾을 수 없습니다.</h1><Link href="/">도서 목록으로 돌아가기</Link></main>;

  function addToCart() {
    const saved = window.localStorage.getItem('dodid-cart');
    const cart = saved ? JSON.parse(saved) as Record<number, number> : {};
    cart[book!.id] = (cart[book!.id] ?? 0) + quantity;
    window.localStorage.setItem('dodid-cart', JSON.stringify(cart));
    setMessage(`${book!.title} ${quantity}권을 장바구니에 담았습니다.`);
  }

  return (
    <main className="detail-page">
      <div className="shop-notice"><span>도서출판 도디드 공식 온라인 서점</span><span>출간 도서 약 140권 · 한 권씩 등록 중</span></div>
      <header className="detail-header"><Link className="shop-wordmark" href="/">DODID <span>BOOKS</span></Link><Link className="back-shop" href="/"><ArrowLeft /> 저자별 서가</Link><button className="detail-cart" onClick={addToCart}><ShoppingBag /> 장바구니</button></header>
      <nav className="detail-breadcrumb"><Link href="/">홈</Link><span>/</span><Link href="/#authors">아더 핑크 서가</Link><span>/</span><strong>{book.title}</strong></nav>

      <section className="product-detail">
        <div className="product-gallery">
          <div className="detail-cover"><span>{book.subject}</span><img src={book.gallery[activeImage]} alt={`${book.title} ${activeImage === 0 ? '입체 표지' : '앞표지'}`} /></div>
          <div className="gallery-thumbs">{book.gallery.map((image, index) => <button className={activeImage === index ? 'active' : ''} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={index === 0 ? '입체 표지 보기' : '앞표지 보기'} /></button>)}</div>
        </div>
        <div className="detail-summary">
          <div className="detail-tags"><span>{book.subject}</span><span>{book.format}</span><span>아더 핑크 서가</span></div>
          <p className="detail-series">{book.series}</p><h1>{book.title}</h1><p className="detail-subtitle">{book.subtitle}</p>
          <dl><div><dt>저자</dt><dd>{book.author}</dd></div><div><dt>역자</dt><dd>{book.translator}</dd></div><div><dt>출판사</dt><dd>도서출판 도디드</dd></div><div><dt>발행일</dt><dd>{book.date}</dd></div><div><dt>형식</dt><dd>{book.format}</dd></div></dl>
          <div className="detail-price"><span>판매가</span><strong>{won.format(book.price)}원</strong></div>
          <div className="purchase-row"><div className="detail-quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="수량 줄이기"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="수량 늘리기"><Plus /></button></div><strong>{won.format(book.price * quantity)}원</strong></div>
          <div className="detail-actions"><Button variant="outline" onClick={addToCart}><ShoppingBag /> 장바구니</Button><Button onClick={() => setMessage('온라인 결제 시스템 연결 후 이 자리에서 바로 구매할 수 있습니다.')}>바로 구매</Button></div>
          {message && <p className="detail-message">{message}</p>}
          <div className="detail-perks"><span><PackageCheck /> 출판사 직배송</span><span><ShieldCheck /> 자체 주문 구조</span></div>
        </div>
      </section>

      <nav className="detail-tabs"><a href="#description">도서 소개</a><a href="#contents">목차</a><a href="#information">상품 정보</a><a href="#shipping">배송·교환 안내</a></nav>

      <section className="description-section" id="description"><p>BOOK DESCRIPTION</p><h2>도서 소개</h2><div><h3>네 복음서가 증언하는 한 분 그리스도</h3><p>{book.description}</p><blockquote>{book.subtitle}</blockquote></div></section>

      <section className="contents-section" id="contents"><p>TABLE OF CONTENTS</p><h2>목차</h2><ol>{book.contents.map((item) => <li key={item}>{item}</li>)}</ol></section>

      <section className="information-section" id="information"><p>BOOK INFORMATION</p><h2>상품 정보</h2><dl><div><dt>도서명</dt><dd>{book.title}</dd></div><div><dt>저자 / 역자</dt><dd>{book.author} / {book.translator}</dd></div><div><dt>출판사</dt><dd>도서출판 도디드</dd></div><div><dt>분야 / 형식</dt><dd>{book.subject} / {book.format}</dd></div><div><dt>발행일</dt><dd>{book.date}</dd></div><div><dt>쪽수 / 크기</dt><dd>{book.pages}쪽 / {book.size}</dd></div><div><dt>ISBN</dt><dd>{book.isbn13}</dd></div><div><dt>시리즈</dt><dd>{book.series}</dd></div></dl></section>

      <section className="shipping-section" id="shipping"><p>SHOPPING GUIDE</p><h2>배송·교환 안내</h2><div className="guide-grid"><article><PackageCheck /><h3>배송 안내</h3><p>배송비, 출고일과 무료배송 기준은 판매자 정보 등록 후 최종 안내됩니다.</p></article><article><ShieldCheck /><h3>교환·반품 안내</h3><p>종이책과 POD 도서의 교환·반품 기준은 전자상거래 관련 법령과 최종 판매 정책에 따라 표시됩니다.</p></article><article><Check /><h3>주문 안내</h3><p>장바구니와 주문서는 준비되어 있으며 카드 결제는 도디드 명의의 결제대행사 연결 후 활성화됩니다.</p></article></div></section>

      <section className="next-shelf"><p>AUTHOR SHELF</p><h2>아더 핑크 도서 약 50권을<br />이 서가에 이어서 등록합니다.</h2><Link href="/#authors">아더 핑크 서가로 돌아가기 <ArrowLeft /></Link></section>

      <footer><div className="footer-brand">DODID <span>BOOKS</span></div><div className="footer-copy"><strong>도서출판 도디드</strong><p>청교도 · 성경 · 신학 전문 출판사</p><span>약 140권의 출간 도서를 순차 등록하고 있습니다.</span></div><div className="footer-menu"><Link href="/#authors">저자별 서가</Link><Link href="/#series">출간 시리즈</Link><Link href="/#shop">전체 도서</Link></div><p className="copyright">© 2026 DODID PUBLISHING. ALL RIGHTS RESERVED.</p></footer>
    </main>
  );
}

