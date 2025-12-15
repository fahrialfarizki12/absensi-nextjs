// app/dashboard/ClientLayout.tsx
"use client";

import Navbar from "@/components/dashboard/Navbar";
import ToasyProvider from "@/components/ToasyProvider";
import NextTopLoader from "nextjs-toploader";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <ToasyProvider />
      <NextTopLoader color="#2F855A" />
      <main>{children}</main>
    </>
  );
}
