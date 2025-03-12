"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

export default function ProductSmall({
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
        <div className="group">
            <div
                data-testid="product-wrapper"
                className="relative hover:shadow-md transition-shadow duration-300 rounded-xl"
            >
                <div className="mx-6 space-y-2 py-6 flex flex-col justify-center items-center">
                    <div className="py-3">
                        <Thumbnail
                            className="z-0 w-64"
                            thumbnail={product.thumbnail}
                            images={product.images}
                            size="square"
                            isFeatured={isFeatured}
                        />
                    </div>

                    <div className="flex justify-end w-fit">
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
