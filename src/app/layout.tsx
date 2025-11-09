import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextThemeProvider } from "@/context/NextTheme";
import ReactQueryClientProvider from "@/context/ReactQueryClient";
import AdminHeader from "@/components/admin/Header";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sensationz Admin",
  description: "Admin Panel for web and mobile apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased container mx-auto p-2 h-screen`}
      >
        <AdminHeader />
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            {children}

            <Toaster />
          </ReactQueryClientProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
