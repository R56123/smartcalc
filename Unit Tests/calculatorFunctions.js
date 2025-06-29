function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function evaluateExpression(input) {
  let expression = input
    .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')  // ✅ handles √9, √16.5 etc
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

  const trigFunctions = ['Math.sin(toRad', 'Math.cos(toRad', 'Math.tan(toRad'];
  trigFunctions.forEach(fn => {
    if (expression.includes(fn)) expression += ')';
  });

  try {
    const result = eval(expression);
    if (typeof result === 'undefined' || result === Infinity || isNaN(result)) {
      throw new Error('Invalid Calculation');
    }
    return result;
  } catch (e) {
    return 'Syntax Error';
  }
}

module.exports = { toRad, evaluateExpression };
// This code provides two functions: toRad for converting degrees to radians,
// and evaluateExpression for evaluating mathematical expressions with error handling.