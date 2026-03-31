import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coolrain Concrete | Ready Mix & Concrete Products in Laois",
  description: "Coolrain Concrete delivers concrete products and ready mix all over the country and further afield. A small family run business with trusted customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
