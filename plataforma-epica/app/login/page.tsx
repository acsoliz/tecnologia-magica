"use client";
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Login from "./Login"
import { UserController } from "@/src/UserController"
import { getCookie, setCookie } from "cookies-next"

export default function Home() {
	const router = useRouter()

	//Redirect to /incidents if already logged in
	useEffect(() => {
		const checkUserStatus = async () => {
			const token = getCookie("userToken");
			if (token) {
				const profileInfo = await UserController.FetchProfileInfo(token as string);
				if (profileInfo) {
					router.push("/incidents");
				}
			}
		};

		checkUserStatus();
	}, [router])

	async function successLogin(jwtToken: string) {
		setCookie("userToken", jwtToken);
		try {
			const profileInfo = await UserController.FetchProfileInfo(jwtToken);
			if (profileInfo) {
				router.push("/incidents");
			}
		} catch (error) {
			router.push("/login");
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24  bg-gray-100">
			<Login
				loginFunction={UserController.Login} 
				onSuccess={successLogin}
				switchToSignUp={() => router.replace("/signup")}
			/>
		</main>
	)
}
