import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Dream Car Garage",
  description: "Your personal dashboard for tracking dream cars!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Providers session={session}>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
