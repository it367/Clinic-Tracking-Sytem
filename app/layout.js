import './globals.css'
export const metadata = {
  title: 'CMS - KidShine Hawaii',
  description: 'Clinic Management Portal',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
