import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import ToasyProvider from "@/components/ToasyProvider";
import NextTopLoader from "nextjs-toploader";
export const metadata = {
  title: "Dashboard | HOME",
  description: "Dashboard Prakerind SMKS PGRI I TRANSPRAM II",
};

export default function RootLayout({ children }) {
  const token = cookies().get("token")?.value;

  if (!token) redirect("/auth/login");
  return (
    <>
      <Navbar />
      <main className="md:ml-80 md:w-[calc(100%-23rem)] mt-20">
        <ToasyProvider />
        <NextTopLoader color="#2F855A" />
        {children}
      </main>
    </>
  );
}
