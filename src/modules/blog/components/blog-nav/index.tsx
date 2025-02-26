import LocalizedClientLink from "@modules/common/components/localized-client-link";


export default function BlogNav() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 group print:hidden">
      <header className="relative h-16 mx-auto duration-200 backdrop-blur-md bg-black bg-opacity-50 border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <LocalizedClientLink
                href="/blog"
                className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:underline"
              >
                Blog
              </LocalizedClientLink>
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
          </div>
        </nav>
      </header>
    </div>
  )
}
