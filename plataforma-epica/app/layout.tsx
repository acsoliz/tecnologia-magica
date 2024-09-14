import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import LoadScripts from "@/app/LoadScripts";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Plataforma Epica",
	description: "Use esta plataforma para gestionar el estado de bugs"
}

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en" className="bg-gray-100">
			<LoadScripts/>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
