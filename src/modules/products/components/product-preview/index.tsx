import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { ShoppingCart } from "@medusajs/icons"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
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
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="products-wrapper">
        <div className="w-64 relative">
          <div className="w-full absolute flex justify-end z-20">
            <div className="bg-secondary-light gap-x-2 px-3 py-1 rounded-bl-md rounded-tr-md">
              <h1 className="text-md">
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </h1>
            </div>
          </div>

          <div className="absolute w-full h-full flex flex-col justify-end pt-2 z-30 txt-compact-medium">
            <div className="h-fit py-2 space-y-2 bg-white  items-center  rounded-lg drop-shadow-md">
              <div className="flex justify-between mx-3 items-center">
                <Text
                  className="text-xl"
                  data-testid="product-title"
                >
                  {product.title}
                </Text>

                <div className="min-w-fit duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="#D4A373">
                    <path
                      d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                  </svg>
                </div>
              </div>
              <div className="mx-3 text-grey-50">
                <Text className="line-clamp-1">
                  Super mega leckeres brot das jeden glücklich sterben lässt.
                  {product.description}
                </Text>
              </div>
            </div>
          </div>

          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="z-10"
          />
        </div>
      </div>
    </LocalizedClientLink>
  )
}
