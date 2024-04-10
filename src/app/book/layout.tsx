import type { Metadata } from "next";
import { Inter } from "next/font/google";
import IsAuth from "@/components/IsAuth";
import IsAdmin from "@/components/IsAdmin";
import styles from './layout.module.css';
import Nav from "@/components/nav/Nav";

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
      <body className={styles.layout_body} >
        <IsAuth/>
        <Nav/>
        {/* <IsAdmin/> */}
        {children}</body>
    </html>
  );
}
