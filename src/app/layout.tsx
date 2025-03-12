import { getBaseURL } from "@lib/util/env"
import { TooltipProvider } from "@medusajs/ui"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode}) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <TooltipProvider>
            <main className="relative">{props.children}</main>
        </TooltipProvider>
      </body>
    </html>
  )
}
