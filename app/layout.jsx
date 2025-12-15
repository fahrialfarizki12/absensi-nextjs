
import { Poppins } from "next/font/google"
import "./app.css"
const PoppinsFont = Poppins({
  weight: ["100", "400", "500", "600", "900"],
  subsets: ["latin"],
});
export const metadata = {
  title: "Dashboard | HOME",
  description: "Dashboard Prakerind SMKS PGRI I TRANSPRAM II",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-200">
      <body className={`${PoppinsFont.className} `}>
        
        <main>{children}</main>
      </body>
    </html>
  );
}
