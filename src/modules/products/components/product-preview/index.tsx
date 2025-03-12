"use client"

import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

export default function ProductPreview({
  product,
  increaseProductQuantity,
  decreaseProductQuantity,
  amount,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  increaseProductQuantity: (product: HttpTypes.StoreProduct) => void
  decreaseProductQuantity: (product: HttpTypes.StoreProduct) => void
  amount: number
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

  function truncate(str: string | null) {
    if (!str) return str
    return str.length > 40 ? str.substring(0, 35) + "..." : str
  }

  return (
    <div className="group w-full flex flex-col items-center">
      <div
        data-testid="product-wrapper"
        className="relative px-3 py-3 hover:shadow-md transition-shadow duration-300 rounded-xl w-full"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center items-center text-center">
          <div className="py-3">
            <Thumbnail
              className="z-0 w-40"
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
            />
          </div>

          <div>
            <Text className="text-lg font-semibold" data-testid="product-title">
              {product.title}
            </Text>
          </div>

          <div className="flex justify-center">
            <Text
              className="text-lg text-grey-50 "
              data-testid="product-description"
            >
              {truncate(product.description)}
            </Text>
          </div>

          <div className="w-full h-fit flex justify-center items-center">
            <div className="w-24 h-full flex justify-between items-center">
              <button className="cursor-pointer" onClick={() => decreaseProductQuantity(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>

              <h1 className="font-semibold text-xl">{amount}</h1>

              <button className="cursor-pointer" onClick={() => increaseProductQuantity(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <LocalizedClientLink
              className="rounded-lg bg-primary-dark hover:bg-primary-full ease-in-out duration-150 text-white py-1 px-3.5"
              href={`/products/${product.handle}`}
            >
              More Information
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
          <div className="bg-white hover:bg-grey-10 duration-150 rounded-lg absolute w-full h-16 -mt-16 ">
            <div className="h-full items-center flex txt-compact-medium justify-between mx-4">

              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="#D4A373" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
 */
