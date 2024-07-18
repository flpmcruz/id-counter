import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ID Generator",
  description: "Generated Ids for your projects",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
