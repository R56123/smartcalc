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
