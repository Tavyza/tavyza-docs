import Calculator from "@/components/calculator/calc"

export const metadata = {
  title:"Tavyza Docs: Calculator",
  Description:"A base-8 calculator using the BPMDASE order of operations\nBPMDASE is Brackets, Parentheses, Multiplication + Division, Addition + Subtraction, Exponents"
}


export default function template() {
  return (
    <div>
      <h1>Octal calculator</h1>
      <Calculator/>
    </div>
  )
}