'use client'

import { useState } from 'react'

export default function Calculator(equation) {
  ops = ['+', '-', '*', '/']
  bracks = ['(', ')']
  for (item in ops) {
    thing = equation.split(item)
  }
  return (
    <div>
      <input placeholder="Enter an equation..."></input>
      <br/>* Note: digits can only be 0-7.
      <br/>result: {result}
    </div>
  )
}