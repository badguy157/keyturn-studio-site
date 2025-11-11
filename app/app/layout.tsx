import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keyturn Studio",
  description: "From code sprawl to shipping faster: in 3 weeks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
