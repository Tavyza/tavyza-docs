export const metadata = {
  title:"Tavyza Docs: Math portal"
}

export default function Mathportal() {
  return (
    <div className="page">
      <h1>Welcome to the Math portal.</h1>
      These pages contain tools and guides on how to do math in base-8, along with how to do order of operations in Progaza.
      <br />
      <h2>Pages:</h2>
      <ul>
        <li><a href="/math/math">Docs page</a></li>
        <li><a href="/math/calc">Octal Calculator</a>, using a BPMDASE* order of operations.</li>
      </ul>
      * Brackets, Parentheses, Multiplication + Division, Addition + Subtraction, Exponents
    </div>
  )
}