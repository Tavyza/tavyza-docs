'use client'

import { useState } from 'react'

function evaluateOctal(equation) {
  // Remove all spaces
  equation = equation.replaceAll(' ', '');
  
  // Function to tokenize the equation
  function tokenize(str) {
    const tokens = [];
    let currentNumber = '';
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if ('01234567'.includes(char)) {
        currentNumber += char;
      } else {
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
        }
        if ('+-*/()[]'.includes(char)) {
          tokens.push(char);
        }
      }
    }
    
    if (currentNumber) {
      tokens.push(currentNumber);
    }
    
    return tokens;
  }
  
  // Function to convert from octal to decimal
  function octalToDecimal(octal) {
    return parseInt(octal, 8);
  }
  
  // Function to convert from decimal to octal
  function decimalToOctal(decimal) {
    const wholePart = Math.floor(decimal);
    const fractionalPart = decimal - wholePart;
    
    let octalWholePart = wholePart.toString(8);
    
    // Handle fractional part (if any)
    if (fractionalPart > 0) {
      let octalFractionalPart = '';
      let currentFraction = fractionalPart;
      // Calculate up to 8 octal fractional digits
      for (let i = 0; i < 8 && currentFraction > 0; i++) {
        currentFraction *= 8;
        const digit = Math.floor(currentFraction);
        octalFractionalPart += digit.toString();
        currentFraction -= digit;
      }
      
      return octalFractionalPart ? `${octalWholePart},${octalFractionalPart}` : octalWholePart;
    }
    
    return octalWholePart;
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
      if (!isNaN(token)) {
        // If token is a number, add it to the output queue
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
      if (!isNaN(token)) {
        // If token is a number, push its octal value to the stack
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
    // Check if equation contains only valid octal digits and operators
    if (!/^[0-7+\-*/()[\]\s]+$/.test(equation)) {
      return "Error: Only octal digits (0-7) and operators are allowed";
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
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        * Note: Only octal digits (0-7) are allowed.
      </div>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  )
}