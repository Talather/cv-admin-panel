import LayoutContent from "@/components/LayoutComponent";
import { AuthProvider } from "@/context/AuthContext";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CV-LITE",
  description: "An AI Powered Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

