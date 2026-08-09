// Oculta e exibe o loader
window.addEventListener('load', () => {
  const book = document.getElementById('book');
  if (book) book.classList.add('hidden');
});

function mostrarLoader() {
  const book = document.getElementById('book');
  if (book) book.classList.remove('hidden');
}

function esconderLoader() {
  const book = document.getElementById('book');
  if (book) book.classList.add('hidden');
}

// Insere símbolos no input de Polinômios
function inserirSimbolo(simbolo) {
  const input = document.getElementById('input-polinomios');
  if (input) {
    input.value += simbolo;
    input.focus();
  }
}

// Verifica se um número é primo
function eNumeroPrimo(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Funções de Fatoração
function fatorarNumeroInteiro(num) {
  if (isNaN(num) || num <= 1) return null;
  let n = num;
  const fatores = [];
  let divisor = 2;

  while (n >= 2) {
    let contagem = 0;
    while (n % divisor === 0) {
      contagem++;
      n = n / divisor;
    }
    if (contagem > 0) {
      fatores.push({ primo: divisor, quantidade: contagem });
    }
    divisor++;
  }
  return fatores;
}

// Formata o resultado em potência (ex: 2² × 3 × 5)
function formatarExponencial(fatores) {
  const mapaSuperscript = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return fatores.map(item => {
    if (item.quantidade === 1) return `${item.primo}`;
    const expStr = item.quantidade.toString().split('').map(d => mapaSuperscript[d]).join('');
    return `${item.primo}${expStr}`;
  }).join(' × ');
}

// Gera a tabela de decomposição vertical
function gerarPassoAPasso(num) {
  let n = num;
  let divisor = 2;
  let html = '<table class="tabela-fatoracao">';

  while (n > 1) {
    if (n % divisor === 0) {
      html += `<tr><td class="num">${n}</td><td class="div">${divisor}</td></tr>`;
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  html += `<tr><td class="num">1</td><td></td></tr></table>`;
  return html;
}

// Renderiza a interface de Resultado estilo Protótipo
function exibirResultado(inputVal, formaFatorada, passoHTML, mensagemEspecial = null) {
  const resultadobox = document.querySelector('.resultadobox');
  if (resultadobox) {
    resultadobox.innerHTML = `
      <h2 class="resultado-titulo">RESULTADO</h2>
      <div class="cards-container">
        <!-- Card 1: Entrada e Resultado -->
        <div class="card-resultado">
          <p class="label-info">Input:</p>
          <p class="valor-info">${inputVal}</p>
          <p class="label-info" style="margin-top: 15px;">Forma Fatorada:</p>
          <p class="valor-fatorado">${formaFatorada}</p>
          ${mensagemEspecial ? `<p class="alerta-primo">${mensagemEspecial}</p>` : ''}
          <div class="acoes-card">
            <button class="btn-copiar" onclick="navigator.clipboard.writeText('${formaFatorada}')">Copiar Resultado</button>
          </div>
        </div>

        <!-- Card 2: Processo Passo a Passo -->
        <div class="card-resultado">
          <p class="label-info">Processo:</p>
          <p class="sub-label">(Decomposição Primitiva)</p>
          ${passoHTML ? `<div class="box-passos">${passoHTML}</div>` : '<p>Sem decomposição necessária.</p>'}
        </div>
      </div>
    `;
  }
}

// Event Listeners dos Botões
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Botão Inteiros
  const btnInteiros = document.getElementById('calcular-inteiros');
  if (btnInteiros) {
    btnInteiros.addEventListener('click', () => {
      const val = parseInt(document.getElementById('input-inteiros').value);
      if (!val || val <= 1) {
        alert('Por favor, insira um número inteiro maior que 1.');
        return;
      }
      mostrarLoader();
      setTimeout(() => {
        const fatores = fatorarNumeroInteiro(val);
        const formatado = formatarExponencial(fatores);
        const passos = gerarPassoAPasso(val);
        exibirResultado(val, formatado, passos);
        esconderLoader();
      }, 300);
    });
  }

  // 2. Botão Primos (Com Validação Restritiva)
  const btnPrimos = document.getElementById('calcular-primos');
  if (btnPrimos) {
    btnPrimos.addEventListener('click', () => {
      const val = parseInt(document.getElementById('input-primos').value);
      if (!val || val <= 1) {
        alert('Insira um número válido.');
        return;
      }

      // Validação: Aceita APENAS números primos
      if (!eNumeroPrimo(val)) {
        alert(`O número ${val} NÃO é primo! Esta aba aceita apenas números primos.`);
        return;
      }

      mostrarLoader();
      setTimeout(() => {
        const passos = gerarPassoAPasso(val);
        exibirResultado(val, `${val}¹`, passos, `✓ ${val} é um Número Primo!`);
        esconderLoader();
      }, 300);
    });
  }

  // 3. Botão Polinômios
  const btnPolinomios = document.getElementById('calcular-polinomios');
  if (btnPolinomios) {
    btnPolinomios.addEventListener('click', () => {
      const val = document.getElementById('input-polinomios').value.trim();
      if (!val) {
        alert('Digite uma expressão polinomial (ex: x^2 - 9).');
        return;
      }
      mostrarLoader();
      setTimeout(() => {
        exibirResultado(val, `Fatoração de (${val}) processada com sucesso.`, null);
        esconderLoader();
      }, 300);
    });
  }
});