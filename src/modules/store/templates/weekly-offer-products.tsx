import { getWeeklyOffer } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import WeeklyOfferProductsClientTemplate from "@modules/store/templates/weekly-offer-products-client"
import {retrieveCustomer} from "@lib/data/customer";

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


  const customer = await retrieveCustomer()

  if (weeklyoffers.length === 0) {
    return (
      <>
        <div className="mb-3 mt-4 text-2xl-semi">
          <h1 data-testid="store-page-title">
            Derzeit ist kein Wochenangebot verfügbar.
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
        customer={customer}
      ></WeeklyOfferProductsClientTemplate>
    </>
  )
}
