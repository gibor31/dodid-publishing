const $ = (selector) => document.querySelector(selector);
const cart = $('#cart');
const backdrop = $('#backdrop');
const cartCount = $('#cartCount');
const quantity = $('#quantity');
const cartItem = $('#cartItem');
const cartEmpty = $('#cartEmpty');
const cartTotal = $('#cartTotal');
const total = $('#total');
const order = $('#order');
let count = Number(localStorage.getItem('dodid-cart-count') || 0);

function renderCart() {
  cartCount.textContent = count;
  quantity.textContent = Math.max(count, 1);
  total.textContent = `${(count * 12000).toLocaleString('ko-KR')}원`;
  const hasItems = count > 0;
  cartItem.classList.toggle('visible', hasItems);
  cartTotal.classList.toggle('visible', hasItems);
  order.classList.toggle('visible', hasItems);
  cartEmpty.style.display = hasItems ? 'none' : 'block';
  localStorage.setItem('dodid-cart-count', String(count));
}

function openCart() { cart.classList.add('open'); backdrop.classList.add('open'); cart.setAttribute('aria-hidden', 'false'); }
function closeCart() { cart.classList.remove('open'); backdrop.classList.remove('open'); cart.setAttribute('aria-hidden', 'true'); }

$('#cartButton').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);
document.querySelectorAll('.add-cart').forEach((button) => button.addEventListener('click', () => { count += 1; renderCart(); openCart(); }));
$('#plus').addEventListener('click', () => { count += 1; renderCart(); });
$('#minus').addEventListener('click', () => { count = Math.max(0, count - 1); renderCart(); });
order.addEventListener('click', () => { $('#orderNote').textContent = '온라인 결제 시스템 연결 후 이 자리에서 주문과 결제를 진행할 수 있습니다.'; });
$('#search').addEventListener('input', (event) => {
  const word = event.target.value.trim().toLowerCase();
  const product = $('.product');
  const show = !word || product.dataset.search.toLowerCase().includes(word);
  product.style.display = show ? 'block' : 'none';
  $('#empty').style.display = show ? 'none' : 'block';
});
renderCart();

