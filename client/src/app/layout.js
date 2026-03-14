import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorWrapper from "./ErrorWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Redis & UpStash Auth",
  description: "Secure, real-time authentication powered by Redis and UpStash.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        bis_skin_checked="1"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorWrapper>{children}</ErrorWrapper>
      </body>
    </html>
  );
}
