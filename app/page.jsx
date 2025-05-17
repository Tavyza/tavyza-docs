import '@/globals/globals.css'

export const metadata = {
  title:"Tavyza Docs: main page"
}

export default function Home() {
  return (
    <div><h1>Welcome to Tavyza Docs</h1>
    The one-stop shop for everything Ijeða. <br/>
    Portals:
    <ul>
      <li><a href='/math/'>Math portal</a></li>
      <li><a href='/language/'>Language portal</a></li>
    </ul>
    
    </div>
  )
}