import './globals.css'
export const metadata = {
  title: 'CMS - KidShine Hawaii',
  description: 'Clinic Management Portal for KidsShine Hawaii',
  authors: [{ name: 'Mark Murillo' }],
  creator: 'Mark Murillo',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
