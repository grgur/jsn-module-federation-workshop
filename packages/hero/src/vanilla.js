function render() {
  const hello = document.createElement('h2');
  hello.textContent = 'I feel heroic!';
  document.body?.appendChild(hello);
}

export default render;

render();
