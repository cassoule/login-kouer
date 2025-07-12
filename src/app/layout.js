import {Plus_Jakarta_Sans, Poppins} from "next/font/google";
import "./globals.css";
import Image from "next/image";

const poppins = Poppins({
    variable: "--font-poppins",
    weight: '500',
})

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
})

export const metadata = {
  title: "Kouer - Commencez l'aventure !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10">
            <Image
                className="object-cover"
                src="/bg.jpg"
                alt="Next.js logo"
                fill
                priority
            />
        </div>
        {children}
      </body>
    </html>
  );
}
