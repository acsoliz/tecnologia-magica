"use client"
import { useRequest } from "ahooks";
import { getCookie } from "cookies-next";
import { UserController } from "@/src/UserController";

export function useUserProfile() {
  const { data: profile, error, loading, run: loadProfile } = useRequest(
    async () => {
      const token = getCookie("userToken") as string;
      if (!token) throw new Error("No token found");
      return await UserController.FetchProfileInfo(getCookie("userToken") as string)
    },
    {
      onError: (err) => {
        console.error("Error fetching user profile:", err);
      }
    }
  );

  return { profile, error, loading, loadProfile };
}
