import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import WeeklyOfferProducs from "./weekly-offer-products"

const StoreTemplate = ({
  // sortBy,
  // page,
  countryCode,
}: {
  // sortBy?: SortOptions
  // page?: string
  countryCode: string
}) => {
  // const pageNumber = page ? parseInt(page) : 1
  // const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {/* <RefinementList sortBy={sort} /> */}
      <div className="w-full">
        {/* <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">Weekly Offer</h1>
        </div> */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <WeeklyOfferProducs countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
