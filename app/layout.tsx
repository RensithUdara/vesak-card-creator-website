import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vesak Card Creator',
  description: 'Created by CodeCraftix Technologies',
  generator: 'vesak-card-creator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
