import ToasyProvider from "@/components/ToasyProvider";

export const metadata = {
  title: "Auth Login & Register",
  description: "Pendaftaran Akun Prakerind Siswa SMKS PGRI I TRANSPRAM II",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AuthLayout({ children }) {
  return (
    <main>
      <ToasyProvider />
      {children}
    </main>
  );
}
