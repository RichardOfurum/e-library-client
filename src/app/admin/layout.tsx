import type { Metadata } from "next";
import { Inter } from "next/font/google";
import IsAuth from "@/components/IsAuth";
import IsAdmin from "@/components/IsAdmin";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "user",
  description: "library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <IsAuth/>
        <IsAdmin/>
        {children}</body>
    </html>
  );
}
