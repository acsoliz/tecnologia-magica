"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { UserController } from "@/src/UserController";
import { useRequest } from "ahooks"


// Midleware to check Login
export default function protectedRoute(Component: React.ComponentType) {
    return function ProtectedComponent(props: any) {
        const router = useRouter();

        const { run: checkLogin } = useRequest(async () => {
            const token = getCookie("userToken");

            if (!token) {
                throw new Error("No token found");
            }

            // Get user info to verify token
            const profileInfo = await UserController.FetchProfileInfo(token as string);
            // console.log()
            if (!profileInfo) {
                //TODO. aqui borrar el token almacenado en localstorage
                throw new Error("Invalid token");
            }
        }, {
            manual: true,
            onError: (error) => {
                router.push("/login");
                // if (error.message === "No token found") {
                    // router.push("/login");
                // } else if (error.message === "Not an admin") {
                    // router.push("/panel/projects");
                // } else {
                    // router.push("/login");
                // }
            }
        });

        useEffect(() => {
            checkLogin();
        }, [checkLogin]);

        return <Component {...props} />;
    };
}
