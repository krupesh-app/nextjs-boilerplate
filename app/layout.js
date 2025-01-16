import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/AuthProvider"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js App with Auth",
  description: "Boilerplate for Next.js with Authentication",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
