window.addEventListener('load', () => {
  const book = document.getElementById('book');
  if (book) {
    book.classList.add('hidden');
  }
});

function mostrarLoader() {
  const book = document.getElementById('book');
  if (book) {
    book.classList.remove('hidden');
  }
}

function esconderLoader() {
  const book = document.getElementById('book');
  if (book) {
    book.classList.add('hidden');
  }
}

function inserirSimbolo(simbolo) {
    const input = document.getElementById('input-polinomios');

    input.value += simbolo;
    
    input.focus();
}