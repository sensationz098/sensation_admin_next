import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextThemeProvider } from "@/context/NextTheme";
import ReactQueryClientProvider from "@/context/ReactQueryClient";
import Header from "@/components/common/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

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
        className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <Header />
            
            <SidebarProvider>
              <main className="flex-1 container mx-auto">
                {children}
              </main>
            </SidebarProvider>

            <Toaster />
          </ReactQueryClientProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";
// import { NextThemeProvider } from "@/context/NextTheme";
// import ReactQueryClientProvider from "@/context/ReactQueryClient";
// import Header from "@/components/common/Header";
// import { SidebarProvider } from "@/components/ui/sidebar";

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   preload: true,
// });

// export const metadata: Metadata = {
//   title: "Sensationz Admin",
//   description: "Admin Panel for web and mobile apps",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${poppins.variable} antialiased   flex flex-col`}
//       >
//         <NextThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ReactQueryClientProvider>

            
//             <SidebarProvider >
//               <main className="flex-1 overflow-auto container mx-auto">
//                 <Header />
//                 {children}
//               </main>
//             </SidebarProvider>

//             <Toaster />
//           </ReactQueryClientProvider>
//         </NextThemeProvider>
//       </body>
//     </html>
//   );
// }