import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "@/app/ui/global.css";
import { SessionProvider } from "next-auth/react";

const notosans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={` ${notosans.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
