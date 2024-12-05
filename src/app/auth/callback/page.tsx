"use client";
import authenticate from "@/server/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = async () => {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      await authenticate();
    };
    checkUser();
  }, []);
  router.push("/");
  return <div></div>;
};

export default AuthCallback;
