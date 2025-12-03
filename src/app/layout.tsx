import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '张三丰 | 全栈开发工程师',
  description: 'React / Node.js / Python / AI工程化',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-[#0a0e17] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}