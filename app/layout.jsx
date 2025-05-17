import '@/globals/globals.css'

export const metadata = {
  title: 'Tavyza Docs: undefined',
  description: 'Tavyza Docs is a website holding information on everything Ijeða-related.'
}

export const viewport = {
  themeColor: '#06105a'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
