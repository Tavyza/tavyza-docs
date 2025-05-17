import Calculator from "@/components/calculator/calc"

export const metadata = {
  title:"we have template"
}


export default function template() {
  return (
    <div>
      <h1>Octal calculator</h1>
      <Calculator/>
    </div>
  )
}