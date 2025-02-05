import { getWeeklyOffer } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

export default async function WeeklyOfferProducts({
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

  if (weeklyoffers.length === 0) {
    return (
      <>
        <div className="mb-3 mt-4 text-2xl-semi">
          <h1 data-testid="store-page-title">
            There is no weekly offer available at the moment.
          </h1>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-5 flex justify-between mt-10 font-semibold ">
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
