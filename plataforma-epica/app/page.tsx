"use client"
import { redirect, useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { useEffect } from "react"

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const token = getCookie("userToken");
		if (!token) {
			router.push("/login");
			return;
		}

	}, [router]);

	return null; 
}
