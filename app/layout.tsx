import type { Metadata } from "next";
import Providers  from "./providers";
import Navbar from "@/components/navigation/navbar";
export const metadata: Metadata = {
  title: "SweatSmartly",
  description: "SweatSmartly is een innovatieve app die je helpt om je fitnessdoelen te bereiken door middel van gepersonaliseerde trainingsschema's en voedingsadvies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" style={{ overflowX: 'hidden' }}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
