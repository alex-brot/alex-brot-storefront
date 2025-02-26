import { getWeeklyOffer } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import WeeklyOfferProductsClientTemplate from "@modules/store/templates/weekly-offer-products-client"

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
      <WeeklyOfferProductsClientTemplate
        weeklyoffers={weeklyoffers}
        region={region}
      ></WeeklyOfferProductsClientTemplate>
    </>
  )
}
