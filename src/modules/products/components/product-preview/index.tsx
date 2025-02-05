import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group ">
      <div data-testid="product-wrapper" className="relative hover:shadow-customProductShadow transition-shadow duration-300 rounded-lg m-2">
        <div className="relative ">
          <div className="w-full flex justify-end absolute z-10">
            <div className="flex justify-end px-3 py-1.5 text-black bg-secondary-light rounded-tr-lg rounded-bl-lg w-fit gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          <Thumbnail
            className="z-0"
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="bg-white hover:bg-grey-10 duration-150 rounded-lg absolute w-full h-16 -mt-16 ">
            <div className="h-full items-center flex txt-compact-medium justify-between mx-4">
              <Text className="text-lg " data-testid="product-title">
                {product.title}
              </Text>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="#D4A373" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
