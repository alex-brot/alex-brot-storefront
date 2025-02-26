"use client"

import ProductPreview from "@modules/products/components/product-preview"
import { WeeklyOffer } from "@lib/data/products"

import { HttpTypes, StoreRegion } from "@medusajs/types"
import { useEffect, useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"

export default function WeeklyOfferProductsClientTemplate({
  weeklyoffers,
  region,
}: {
  weeklyoffers: WeeklyOffer[]
  region: StoreRegion
}) {
  const [selectedProducts, setSelectedProducts] = useState(
    new Map<HttpTypes.StoreProduct, number>()
  )

  const [totalPrice, setTotalPrice] = useState(0)

  const addProduct = (product: HttpTypes.StoreProduct) => {
    const newMap = new Map<HttpTypes.StoreProduct, number>(selectedProducts)
    const oldAmount = newMap.get(product)
    const newAmount = oldAmount ? oldAmount + 1 : 1
    newMap.set(product, newAmount)
    setSelectedProducts(newMap)
  }

  const removeProduct = (product: HttpTypes.StoreProduct) => {
    const newMap = new Map<HttpTypes.StoreProduct, number>(selectedProducts)
    const oldAmount = newMap.get(product)
    const newAmount = oldAmount ? oldAmount - 1 : 0
    newMap.set(product, newAmount)
    setSelectedProducts(newMap)
  }

  useEffect(() => {
    let total = 0
    for (const [key, value] of selectedProducts.entries()) {
      total +=
        (getProductPrice({ product: key }).cheapestPrice
          ?.calculated_price_number || 0) * value
    }
    setTotalPrice(total)
  }, [selectedProducts])

  return (
    <>
      <div className="mb-16 flex justify-between mt-10 font-semibold ">
        <h1 data-testid="store-page-title" className="text-5xl">
          Weekly Offer.
        </h1>
        <h1 className="text-4xl text-grey-30 underline">
          {weeklyoffers[0].title.toUpperCase()}
        </h1>
      </div>

      <div className="flex gap-x-4 ">
        <div className="w-3/4">
          <ul
            className="flex flex-col w-full gap-y-6"
            data-testid="products-list"
          >
            {weeklyoffers[0].products.map((p) => {
              return (
                <li
                  key={p.id}
                  className="animate-in fade-in zoom-in duration-500"
                >
                  <ProductPreview
                    product={p}
                    region={region}
                    increaseProductQuantity={addProduct}
                    decreaseProductQuantity={removeProduct}
                    amount={selectedProducts.get(p) || 0}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <div className="w-1/4 relative flex justify-end">
          <div className="w-1/6 fixed h-fit border border-grey-30 bg-white rounded-lg shadow-md">
            <div className="py-5 mx-6 h-fit flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Gesamtpreis:</h1>
              <h1 className="text-xl">{totalPrice}€</h1>
            </div>

            <div className="flex justify-center">
              <div className="w-2/3 ">
                <small className="text-grey-40 text-center">
                  Klicken Sie auf das „+“-Symbol eines Produkts, um jenes zu Ihrem Warenkorb hinzuzufügen.
                </small>
              </div>
            </div>

            <div className="flex justify-center py-5">
              <button className="rounded-lg py-1.5 px-3.5 bg-secondary-light duration-150 ease-in-out" onClick={() => console.log(selectedProducts)}>Go to bag</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
