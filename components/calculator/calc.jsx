'use client'

import { useState } from 'react'

function evaluateOctal(equation) {
  // Remove all spaces
  equation = equation.replaceAll(' ', '');
  
  // Function to tokenize the equation, now handling fractional numbers with dots
  function tokenize(str) {
    const tokens = [];
    let currentNumber = '';
    let hasDot = false;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      
      // Handle digits and dots in numbers
      if ('01234567'.includes(char) || (char === '.' && !hasDot && currentNumber.length > 0)) {
        if (char === '.') hasDot = true;
        currentNumber += char;
      } else {
        // End of current number
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
          hasDot = false;
        }
        
        // Handle operators and brackets
        if ('+-*/()[]'.includes(char)) {
          tokens.push(char);
        }
      }
    }
    
    // Add the last number if present
    if (currentNumber) {
      tokens.push(currentNumber);
    }
    
    return tokens;
  }
  
  // Function to convert octal to decimal, now handling fractional parts with dots
  function octalToDecimal(octal) {
    if (octal.includes('.')) {
      const [wholePart, fractionalPart] = octal.split('.');
      
      // Convert whole part
      let decimalValue = parseInt(wholePart, 8);
      
      // Convert fractional part
      if (fractionalPart) {
        let fractionalDecimal = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
          fractionalDecimal += parseInt(fractionalPart[i], 8) / Math.pow(8, i + 1);
        }
        decimalValue += fractionalDecimal;
      }
      
      return decimalValue;
    }
    
    // Simple whole number case
    return parseInt(octal, 8);
  }
  
  // Simplified decimal to octal conversion with proper fractional handling using dots
  function decimalToOctal(decimal) {
    // Handle whole numbers
    if (Number.isInteger(decimal)) {
      return decimal.toString(8);
    }
    
    // For numbers with fractional parts
    const wholePart = Math.floor(decimal);
    const fractionalPart = decimal - wholePart;
    
    // Convert whole part to octal
    const octalWholePart = wholePart.toString(8);
    
    // Convert fractional part to octal
    let octalFractional = '';
    let currentFractional = fractionalPart;
    
    // Calculate octal representation of fractional part (with reasonable precision)
    for (let i = 0; i < 6 && currentFractional > 0.00001; i++) {
      currentFractional *= 8;
      const digit = Math.floor(currentFractional);
      octalFractional += digit;
      currentFractional -= digit;
    }
    
    return octalFractional ? `${octalWholePart}.${octalFractional}` : octalWholePart;
  }
  
  // Implementation of the shunting yard algorithm for parsing expressions
  function parseExpression(tokens) {
    const outputQueue = [];
    const operatorStack = [];
    
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
    
    for (const token of tokens) {
      if (token.match(/^[0-7]+(\.[0-7]+)?$/)) {
        // If token is a number (potentially with fraction), add it to the output queue
        outputQueue.push(token);
      } else if ('+-*/'.includes(token)) {
        // If token is an operator
        while (
          operatorStack.length > 0 &&
          '+-*/'.includes(operatorStack[operatorStack.length - 1]) &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(' || token === '[') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
          operatorStack.pop(); // Discard the '('
        }
      } else if (token === ']') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '[') {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '[') {
          operatorStack.pop(); // Discard the '['
        }
      }
    }
    
    // Pop any remaining operators from the stack to the output queue
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
    
    return outputQueue;
  }
  
  // Evaluate the expression in Reverse Polish Notation (RPN)
  function evaluateRPN(rpn) {
    const stack = [];
    
    for (const token of rpn) {
      if (token.match(/^[0-7]+(\.[0-7]+)?$/)) {
        // If token is a number, push its decimal value to the stack
        stack.push(octalToDecimal(token));
      } else if ('+-*/'.includes(token)) {
        // If token is an operator, pop two values from the stack,
        // apply the operation, and push the result back
        const b = stack.pop();
        const a = stack.pop();
        
        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            stack.push(a / b);
            break;
        }
      }
    }
    
    // The final result should be the only value left on the stack
    return stack[0];
  }
  
  // Main calculation process
  try {
    // Check if equation contains only valid characters
    if (!/^[0-7+\-*/()[\].\s]+$/.test(equation)) {
      return "Error: Only octal digits (0-7), operators, and dots for fractions are allowed";
    }
    
    const tokens = tokenize(equation);
    const rpn = parseExpression(tokens);
    const result = evaluateRPN(rpn);
    
    return decimalToOctal(result);
  } catch (error) {
    return "Error: " + error.message;
  }
}

export default function Calculator() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState('');
  
  const handleCalculate = () => {
    setResult(evaluateOctal(equation));
  };
  
  return (
    <div className="p-4">
      <div className="flex mb-2">
        <input 
          className="border p-2 mr-2 flex-grow"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="Enter an equation (e.g., 5 + 3 - 4 / (3 * 2))"
        />
        <button 
          className="calcbutton"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
      <div className="text-sm text-gray-600 mb-4">
      </div>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
      * Note: Only octal digits (0-7) are allowed.
    </div>
  )
}