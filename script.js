const display = document.getElementById('display');
let currentInput = '';
let resetDisplay = false;

// Update display content
function updateDisplay(value) {
  display.textContent = value || '0';
}

// Handle button click
function handleButtonClick(value) {
  if (value === 'C') {
    currentInput = '';
  } else if (value === '←') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = 'Error';
    }
  } else {
    if (currentInput === 'Error') currentInput = '';
    currentInput += value;
  }

  updateDisplay(currentInput);
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
