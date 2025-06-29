const { toRad, evaluateExpression } = require('./calculatorFunctions');

test('Converts degrees to radians correctly', () => {
  expect(toRad(180)).toBeCloseTo(Math.PI);
  expect(toRad(90)).toBeCloseTo(Math.PI / 2);
});

test('Evaluates basic math', () => {
  expect(evaluateExpression('2+2')).toBe(4);
  expect(evaluateExpression('3*5')).toBe(15);
});

test('Handles scientific expressions', () => {
  expect(evaluateExpression('√9')).toBe(3);
  expect(evaluateExpression('sin(90)')).toBeCloseTo(1, 1);
  expect(evaluateExpression('cos(0)')).toBeCloseTo(1, 1);
});

test('Catches invalid expressions', () => {
  expect(evaluateExpression('2 + * 3')).toBe('Syntax Error');
  expect(evaluateExpression('tan(abc)')).toBe('Syntax Error');
});
