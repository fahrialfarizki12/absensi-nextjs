// app/dashboard/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientLayout from "./ClientLayout.jsx";

export default function Layout({ children }) {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/auth/login");

  return <ClientLayout>{children}</ClientLayout>;
}
