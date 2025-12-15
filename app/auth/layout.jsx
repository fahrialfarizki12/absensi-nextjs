import ToasyProvider from "@/components/ToasyProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Auth Login & Register",
  description: "Pendaftaran Akun Prakerind Siswa SMKS PGRI I TRANSPRAM II",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function AuthLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) redirect("/dashboard");

  return (
    <main>
      <ToasyProvider />
      {children}
    </main>
  );
}
