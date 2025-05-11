const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
// Load history from localStorage on page load
const savedHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

savedHistory.forEach(entry => {
  addToHistory(entry);
});

let currentInput = '';
let resetDisplay = false;

// Update display content
function updateDisplay(value) {
  display.classList.remove('error');
  if (value === 'Syntax Error' || value === 'Invalid Input') {
    display.classList.add('error');
  }
  display.textContent = value || '0';
}

function handleButtonClick(value) {
  if (value === 'C') {
    currentInput = '';
  } else if (value === '←') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
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

  try {
    const result = eval(expression);

    if (
      typeof result === 'undefined' ||
      result === Infinity ||
      isNaN(result)
    ) {
      throw new Error('Invalid Calculation');
    }

    addToHistory(`${currentInput} = ${result}`);
    currentInput = result.toString();
  } catch (error) {
    if (error.message === 'Invalid Calculation') {
      currentInput = 'Invalid Input';
    } else {
      currentInput = 'Syntax Error';
    }
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

// Save updated history
  const currentHistory = Array.from(historyList.children).map(li => li.textContent);
  localStorage.setItem('calcHistory', JSON.stringify(currentHistory));
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
  const key = e.key.toLowerCase(); // Handle both upper/lower case

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
    handleButtonClick(key);
  } else if (key === 'enter') {
    handleButtonClick('=');
  } else if (key === 'backspace') {
    handleButtonClick('←');
  } else if (key === 'escape') {
    handleButtonClick('C');
  }

  // Extended support for scientific functions
  else if (key === '^') {
    handleButtonClick('^');
  } else if (key === 's') {
    handleButtonClick('sin');
  } else if (key === 'c') {
    handleButtonClick('cos');
  } else if (key === 't') {
    handleButtonClick('tan');
  } else if (key === 'l') {
    handleButtonClick('ln');
  } else if (key === 'g') {
    handleButtonClick('log');
  } else if (key === 'r') {
    handleButtonClick('√');
  } else if (key === 'p') {
    handleButtonClick('π');
  } else if (key === 'e') {
    handleButtonClick('e');
  }
    // Shortcut: Alt + M to toggle mode
  if (e.altKey && key === 'm') {
    modeSwitch.click(); // Trigger the scientific mode toggle
  }

  // Shortcut: Alt + T to toggle theme
  if (e.altKey && key === 't') {
    themeToggle.click(); // Trigger the theme toggle
  }

});


const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';

  showToast(
    document.body.classList.contains('light-theme') ? 'Light Theme Activated' : 'Dark Theme Activated'
  );
});


const modeSwitch = document.getElementById('modeSwitch');
const sciButtons = document.querySelector('.sci-buttons');
let isScientific = false;

modeSwitch.addEventListener('click', () => {
  isScientific = !isScientific;

  if (isScientific) {
    modeSwitch.textContent = 'Switch to Basic Mode';
    sciButtons.classList.add('visible');
  } else {
    modeSwitch.textContent = 'Switch to Scientific Mode';
    sciButtons.classList.remove('visible');
  }
});

// Clear History Button
const clearHistoryBtn = document.getElementById('clearHistory');

clearHistoryBtn.addEventListener('click', () => {
  if (historyList.children.length === 0) {
    alert('There is no history to clear.');
    return;
  }
  const confirmClear = confirm('Are you sure you want to clear the history?');
  if (confirmClear) {
    historyList.innerHTML = '';
    localStorage.removeItem('calcHistory');
  }
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000); // Toast visible for 2 seconds
}
