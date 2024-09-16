"use client"
import { useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function useSignOutModal() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = () => {
    setIsModalVisible(false);
    signOut();
  };

  const signOut = () => {
    if (getCookie("userToken")) deleteCookie("userToken");
    router.replace("/login");
  };

  return {
    isModalVisible,
    showModal,
    handleOk,
    handleCancel,
  };
}
