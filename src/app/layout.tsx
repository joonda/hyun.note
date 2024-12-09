import type { Metadata } from "next";
import "./globals.css";
import Header from "@/layouts/Header";

export const metadata: Metadata = {
  title: "Hyun.note",
  description: "Hyun.blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
