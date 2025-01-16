import { getWeeklyOffer, listProductsWithSort, WeeklyOffer } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function WeeklyOfferProducs({
  countryCode,
}: {
  countryCode: string
}) {

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

    let {
      response: { weeklyoffers },
    } = await getWeeklyOffer({})


  return (
    <>
      <div className="mb-8 text-2xl-semi">
        <h1 data-testid="store-page-title">Weekly Offer {weeklyoffers[0].title}</h1>
      </div>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {weeklyoffers[0].products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
