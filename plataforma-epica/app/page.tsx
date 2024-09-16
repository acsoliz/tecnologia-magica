"use client"
import { redirect, useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { useEffect } from "react"
import { useUserProfile } from "@/app/incidents/hooks"; // Importar el hook para verificar el token
import { Flex } from "antd";


export default function Home() {
	const router = useRouter();
	
	const { profile, error, loading, loadProfile } = useUserProfile(); // Usar el hook
	useEffect(() => {
		const token = getCookie("userToken");
		if (!token) {
			router.push("/login");
		} else {
			// Call the hook to load the profile
			loadProfile();

			// Check the profile and handle redirection
			if (profile) {
				console.log('profile', profile)
				router.push("/incidents");
			}


			// Si hay un error al obtener el perfil, redirigir al login
			if (error) {
				router.push("/login");
			}
		}


	}, [router, profile, loadProfile, error]);

	// Mientras se verifica el perfil o se hace el redirect, se muestra null o un loader
	if (loading) return <Flex>Loading... </Flex>;

	return null;
}
