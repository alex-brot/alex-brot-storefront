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
      <div data-testid="product-wrapper" className="relative hover:hover:shadow-[0px_2px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 rounded-lg m-2">
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
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                     fill="#D4A373" className="">
                  <path
                    d="M440-720h-80q-17 0-28.5-11.5T320-760q0-17 11.5-28.5T360-800h80v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80h80q17 0 28.5 11.5T640-760q0 17-11.5 28.5T600-720h-80v80q0 17-11.5 28.5T480-600q-17 0-28.5-11.5T440-640v-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM120-800H80q-17 0-28.5-11.5T40-840q0-17 11.5-28.5T80-880h66q11 0 21 6t15 17l159 337h280l145-260q5-10 14-15t20-5q23 0 34.5 19.5t.5 39.5L692-482q-11 20-29.5 31T622-440H324l-44 80h440q17 0 28.5 11.5T760-320q0 17-11.5 28.5T720-280H280q-45 0-68.5-39t-1.5-79l54-98-144-304Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
