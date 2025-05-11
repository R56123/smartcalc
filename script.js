const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

let currentInput = '';
let resetDisplay = false;

// Update display content
function updateDisplay(value) {
  display.textContent = value || '0';
}

function handleButtonClick(value) {
  if (value === 'C') {
    currentInput = '';
  } else if (value === '←') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
    try {
      let expression = currentInput
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E)
        .replace(/√/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sin/g, 'Math.sin(toRad')
        .replace(/cos/g, 'Math.cos(toRad')
        .replace(/tan/g, 'Math.tan(toRad')
        .replace(/x²/g, '**2')
        .replace(/\^/g, '**');

      // Automatically close toRad() if any trig is used
      const trigFunctions = ['Math.sin(toRad', 'Math.cos(toRad', 'Math.tan(toRad'];
      trigFunctions.forEach(fn => {
        if (expression.includes(fn)) expression += ')';
      });

      const result = eval(expression);
        addToHistory(`${currentInput} = ${result}`); // ✅ ADD THIS
      currentInput = result.toString();
    } catch {
      currentInput = 'Error';
    }
  }
  
   else {
    if (currentInput === 'Error') currentInput = '';
    currentInput += value;
  }
  updateDisplay(currentInput);
  
}
function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li); // newest at top
}


// Convert degrees to radians for trig functions
function toRad(deg) {
  return (deg * Math.PI) / 180;
}


// Attach event listeners to all buttons
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    handleButtonClick(button.textContent);
  });
});

// Initial display
updateDisplay(currentInput);

// Listen for keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    handleButtonClick(key);
  } else if (key === 'Enter') {
    handleButtonClick('=');
  } else if (key === 'Backspace') {
    handleButtonClick('←');
  } else if (key === 'Escape') {
    handleButtonClick('C');
  }
});

const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  // Change emoji to match theme
  themeToggle.textContent =
    document.body.classList.contains('light-theme') ? '🌞' : '🌙';
});

// Toggle scientific mode
const sciButtons = document.querySelectorAll('.sci');
const modeSwitch = document.getElementById('modeSwitch');

let isScientificMode = false;

modeSwitch.addEventListener('click', () => {
  isScientificMode = !isScientificMode;

  sciButtons.forEach(btn => {
    btn.style.display = isScientificMode ? 'inline-block' : 'none';
  });

  modeSwitch.textContent = isScientificMode
    ? 'Switch to Basic Mode'
    : 'Switch to Scientific Mode';
});
