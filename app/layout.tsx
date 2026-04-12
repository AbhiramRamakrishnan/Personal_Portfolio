import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Space_Grotesk, Montserrat, Raleway } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-garet',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abhiram Ramakrishnan | CTO · Full Stack Developer · AI Innovator',
  description: 'CTO at Agni Robotics. Full Stack Developer specializing in ROS, AI Development, and Freelance Solutions. Building intelligent systems that push boundaries.',
  keywords: ['full stack developer', 'CTO', 'Agni Robotics', 'ROS', 'AI developer', 'freelancer', 'Abhiram Ramakrishnan', 'Specularis'],
  authors: [{ name: 'Abhiram Ramakrishnan' }],
  openGraph: {
    title: 'Abhiram Ramakrishnan | CTO · Full Stack Developer · AI Innovator',
    description: 'Building intelligent systems at the edge of innovation.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#030318',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${montserrat.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased bg-[#0a0b5c] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
