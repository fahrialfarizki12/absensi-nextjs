"use client";

import axiosClient from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("token");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!query) {
        setMessage("Token tidak valid");
        setIsLoading(false);
        return;
      }

      try {
        const res = await axiosClient.get(`/auth/verify-email?token=${query}`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [query]);

  return (
    <div className="flex flex-col text-center gap-3 h-screen items-center justify-center">
      {isLoading ? (
        <span className="skeleton skeleton-text">Loading....</span>
      ) : (
        <>
          <h1 className="text-3xl font-semibold capitalize text-slate-900">
            {message}
          </h1>
          <Link
            href="/auth/login"
            className="underline capitalize text-slate-900"
          >
            Kembali ke halaman login
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyPage;
