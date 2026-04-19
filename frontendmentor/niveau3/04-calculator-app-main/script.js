(function(){
  const display = document.getElementById('display');
  const keypad = document.querySelector('.keypad');
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  const body = document.body;

  // Calculator state
  let current = '0';
  let previous = null;
  let operation = null; // '+', '-', '*', '/'
  let overwrite = false; // next digit overwrites the current display

  const nf = new Intl.NumberFormat('en-US');

  function format(valueStr) {
    if (valueStr === 'Error') return valueStr;
    if (valueStr === '' || valueStr === '-') return valueStr || '0';
    const negative = valueStr.startsWith('-');
    const [intPart, fracPart] = (negative ? valueStr.slice(1) : valueStr).split('.');
    const intFormatted = nf.format(intPart.replace(/^0+(?=\d)/, ''));
    const withSign = negative ? '-' + intFormatted : intFormatted;
    return fracPart !== undefined ? `${withSign}.${fracPart}` : withSign;
  }

  function setDisplay(valueStr){
    current = valueStr;
    display.textContent = format(valueStr);
  }

  function appendDigit(d) {
    if (overwrite) { current = (d === '.') ? '0.' : d; overwrite = false; return setDisplay(current); }
    if (d === '.') {
      if (current.includes('.')) return; // ignore extra dots
      current += '.';
    } else {
      if (current === '0') current = d; else current += d;
    }
    setDisplay(current);
  }

  function chooseOperation(op) {
    if (operation && !overwrite) {
      // chain: compute previous op first
      compute();
    }
    previous = current;
    operation = op;
    overwrite = true;
  }

  function compute() {
    const a = parseFloat(previous);
    const b = parseFloat(current);
    if (previous === null || operation === null || isNaN(a) || isNaN(b)) return;
    let result;
    switch (operation) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = (b === 0 ? 'Error' : a / b); break;
    }
    if (result === 'Error') {
      setDisplay('Error');
    } else {
      const out = String(result);
      setDisplay(out);
    }
    previous = null;
    operation = null;
    overwrite = true;
  }

  function del() {
    if (overwrite) { // act as reset of current
      overwrite = false;
    }
    if (current.length <= 1 || (current.length === 2 && current.startsWith('-') && !current.includes('.'))) {
      setDisplay('0');
    } else {
      setDisplay(current.slice(0, -1));
    }
  }

  function resetAll() {
    current = '0'; previous = null; operation = null; overwrite = false; setDisplay('0');
  }

  // Event: mouse/touch on keypad
  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const digit = btn.getAttribute('data-key');
    const op = btn.getAttribute('data-op');
    const action = btn.getAttribute('data-action');

    if (digit !== null) return appendDigit(digit);
    if (op !== null) return chooseOperation(op);
    if (action === 'equals') return compute();
    if (action === 'del') return del();
    if (action === 'reset') return resetAll();
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const { key } = e;
    if (/^[0-9]$/.test(key)) { appendDigit(key); return; }
    if (key === '.') { appendDigit('.'); return; }
    if (key === '+' || key === '-' || key === '*' || key === '/') { chooseOperation(key); return; }
    if (key === 'Enter' || key === '=') { e.preventDefault(); compute(); return; }
    if (key === 'Backspace') { del(); return; }
    if (key === 'Delete' || key === 'Escape') { resetAll(); return; }
  });

  // THEME SWITCHER
  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    // update checked radio
    themeRadios.forEach(r => r.checked = (r.value === String(theme)));
    localStorage.setItem('calc-theme', String(theme));
  }

  themeRadios.forEach(radio => radio.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  }));

  function detectInitialTheme() {
    const saved = localStorage.getItem('calc-theme');
    if (saved === '1' || saved === '2' || saved === '3') return saved;
    // Map prefers-color-scheme to themes: dark -> 1, light -> 2
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return dark ? '1' : '2';
  }

  // Initialize
  applyTheme(detectInitialTheme());
  setDisplay('0');
})();
