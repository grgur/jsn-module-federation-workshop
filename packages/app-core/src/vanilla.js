import renderHero from 'hero/Vanilla';

function renderHello() {
  const hello = document.createElement('h1');
  hello.textContent = 'Hello World!';
  document.body?.appendChild(hello);
}

renderHello();

renderHero();
