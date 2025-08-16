import { Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
