import type { Metadata } from "next";
import IsAuth from "@/components/IsAuth";
import IsAdmin from "@/components/IsAdmin";
import styles from './layout.module.css';
import Nav from "@/components/nav/Nav";
import SideMenu from "@/components/sideMenu/SideMenu";

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
            <div className={styles.body}>
                <div className={styles.body_container}>
                  <div className={styles.left}>
                    <SideMenu/>
                  </div>

                  <div className={styles.right}>
                      {children}
                  </div>
                  
                </div>
            </div>
        </body>
    </html>
  );
}
