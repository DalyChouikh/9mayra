import type { Metadata } from "next";
import "./globals.css";
import Starfield from "./components/ui/Starfield";
import Navbar from "./components/ui/Navbar";
import FloatingPets from "./components/ui/FloatingPets";

export const metadata: Metadata = {
  title: "9mayra",
  description: "Learning platform for the children of the moon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`text-ghayaty antialiased bg-[#2A3A5E]`}>
        <Starfield />
        <Navbar />
        <FloatingPets />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
