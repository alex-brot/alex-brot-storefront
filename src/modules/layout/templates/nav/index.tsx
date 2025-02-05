import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 backdrop-blur-md bg-black bg-opacity-50 border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full gap-4">
            <LocalizedClientLink
              href="/team"
              className="txt-compact-medium-plus text-md hover:cursor-pointer hover:underline"
              data-testid="nav-store-link"
            >
              Team
            </LocalizedClientLink>
            <div className="h-1 w-1 bg-primary-full"></div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-2xl hover:cursor-pointer uppercase"
              data-testid="nav-store-link"
            >
              Alex Brot
            </LocalizedClientLink>
            <div className="h-1 w-1 bg-primary-full"></div>
            <LocalizedClientLink
              href="/store"
              className="txt-compact-medium-plus text-md hover:cursor-pointer hover:underline"
              data-testid="nav-store-link"
            >
              Shop
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:cursor-pointer"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:cursor-pointer"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:cursor-pointer flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
