import { getWeeklyOffer } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import ProductSmall from "@modules/products/components/product-small"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const products = await getWeeklyOffer({}).then(({ response }) => {
    return response.weeklyoffers
      .flatMap((offer) => offer.products)
      .filter((responseProduct) => responseProduct.id !== product.id)
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Related products
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          You might also want to check out these products.
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((product) => (
          <li key={product.id} className="w-full">
            <ProductSmall region={region} product={product} increaseProductQuantity={function (product: HttpTypes.StoreProduct): void {
              throw new Error("Function not implemented.")
            } } decreaseProductQuantity={function (product: HttpTypes.StoreProduct): void {
              throw new Error("Function not implemented.")
            } } amount={0} />
          </li>
        ))}
      </ul>
    </div>
  )
}
