import { getWeeklyOffer } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  if (!region) {
    return null
  }

  let {
    response: { weeklyoffers },
  } = await getWeeklyOffer({})

  if(weeklyoffers.length === 0) {
    return null
  }

  return (
    <>
      <div className="mb-5 flex px-6 justify-between mt-10 font-semibold ">
        <h1 data-testid="store-page-title" className="text-5xl">
          Weekly Offer.
        </h1>
        <h1 className="text-4xl text-grey-30 underline">
          {weeklyoffers[0].title.toUpperCase()}
        </h1>
      </div>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {weeklyoffers[0].products.map((p) => {
          return (
            <li key={p.id} className="animate-in fade-in zoom-in duration-500">
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
