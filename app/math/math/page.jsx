export const metadata = {
  title: "Tavyza Docs: Math",
  description: "Information on the math in the Ijeða language family"
}

export default function Math() {
  return (
    <div>
      <div className="page">
        <h1>Math</h1>
        <div className="main-content">
          <p className="main-content">Math in the Ijeðic family works a bit differently to the math you're likely used to. Math in English is typically used with base 10 numbers (0-9, then 10), as we have 10 fingers (usually). The order of operations you're taught is also likely PEMDAS. However the Ijeðic language family (at the very least <a href="/language/progaza/">Progaza</a>) use a different system of numbers and a different order of operations. Progaza uses a base-8 system of numbers (0-7, then 10), so the number 25 in English would be 31 in Progaza. Progaza also uses a different order of operations, BPMDASE (Brackets, Parentheses, Multiplication + Division, Addition + Subtraction, Exponents). A calculator can be used <a href="/math/calc/">here</a>
          <br/><br/>
          This does vary througout the Ijeðic family. For example: <a href="/language/xorgara/">Xorǧara</a> uses a base-20 system of counting.
          </p>

        </div>
        <div className="infobar">
          <div className="infobar-title">Math</div>
          <div className="infobar-content">How math works in the Ijeða language family</div>
        </div>
      </div>
      
    </div>
  )
}