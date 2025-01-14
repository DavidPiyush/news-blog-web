import { Roboto } from "next/font/google";
import "@/app/_styles/globals.css";
import CookieConsent from "./_components/CookieConsent";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / welcome the new website app",
    default: "Welcome / The news web app",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased `}>
        <CookieConsent />
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
