"use client"

import ProductPreview from "@modules/products/components/product-preview"
import { WeeklyOffer } from "@lib/data/products"

import {
  HttpTypes,
  StoreCustomer,
  StoreProduct,
  StoreRegion,
} from "@medusajs/types"
import { useEffect, useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import { addToCart } from "@lib/data/cart"
import { useParams, useRouter } from "next/navigation"

export default function WeeklyOfferProductsClientTemplate({
  weeklyoffers,
  region,
  customer,
}: {
  weeklyoffers: WeeklyOffer[]
  region: StoreRegion
  customer?: StoreCustomer | null | undefined
}) {
  const [selectedProducts, setSelectedProducts] = useState(
    new Map<HttpTypes.StoreProduct, number>()
  )

  const [isAdding, setIsAdding] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const lineCount = useState(0)
  const countryCode = useParams().countryCode as string
  const router = useRouter()

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

  const optionsAsKeymap = (
    variantOptions: HttpTypes.StoreProductVariant["options"]
  ) => {
    return variantOptions?.reduce(
      (acc: Record<string, string>, varopt: any) => {
        acc[varopt.option_id] = varopt.value
        return acc
      },
      {}
    )
  }

  async function handleAddProducts(
    selectedProducts: Map<StoreProduct, number>
  ) {
    if (!customer) return null

    setIsAdding(true)

    try {
      for (let [product, quantity] of selectedProducts) {
        if (!product.variants || product.variants.length === 0) {
          console.error("error, no product variant found")
          return
        }

        const selectedVariant = product.variants[0]

        if (selectedVariant?.id) {
          await addToCart({
            variantId: selectedVariant.id,
            quantity: quantity,
            countryCode, // Adjust country code if needed
          })
        }
      }
    } catch (error) {
      console.error("Error adding products to cart:", error)
    }

    router.push("/cart")
    setIsAdding(false)
  }

  return (
    <>
      <div className="mb-16 flex justify-between mt-10 font-semibold ">
        <h1 data-testid="store-page-title" className="text-5xl">
          Derzeitiges Wochenangebot.
        </h1>
        <h1 className="text-4xl text-grey-30 underline">
          {weeklyoffers[0].title.toUpperCase()}
        </h1>
      </div>

      {/* Total Price Box for Mobile */}
      <div className="w-full sm:hidden bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Gesamtpreis:</h1>
          <h1 className="text-xl">{totalPrice}€</h1>
        </div>
        <small className="text-grey-40 block text-center mt-2">
          Klicken Sie auf das „+“-Symbol eines Produkts, um jenes zu Ihrem Warenkorb hinzuzufügen.
        </small>
        <button
            className="w-full mt-4 rounded-lg text-lg font-semibold py-2 bg-secondary-light hover:bg-secondary-lighter duration-150 ease-in-out disabled:bg-grey-30 disabled:text-grey-70 disabled:cursor-not-allowed"
            onClick={() => handleAddProducts(selectedProducts)}
            disabled={!customer}
        >
          {customer ? "Produkte hinzufügen" : "Melde dich zuerst an"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-x-4 items-center sm:items-start">
        <div className="w-full sm:w-3/4">
          <ul
            className="flex flex-col w-full gap-y-6"
            data-testid="products-list"
          >
            {weeklyoffers[0].products.map((p, index, arr) => {
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

                  {arr.length > 1 && index < arr.length - 1 && (
                    <div className="flex justify-center">
                      <hr className="mt-5 w-full" />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/*Total Price Box for Desktop*/}
        <div className="w-1/4 relative hidden sm:flex justify-end">
          <div className="w-fit lg:w-5/6 sticky top-4 h-fit border border-grey-30 bg-white rounded-lg shadow-md">
            <div className="py-5 px-4 h-fit flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Gesamtpreis:</h1>
              <h1 className="text-xl">{totalPrice}€</h1>
            </div>

            <div className="flex justify-center px-4">
              <small className="text-grey-40 text-center block">
                Klicken Sie auf das „+“-Symbol eines Produkts, um jenes zu Ihrem Warenkorb hinzuzufügen.
              </small>
            </div>

            <div className="flex justify-center py-5 px-4">
              <button
                  className="rounded-lg text-lg font-semibold py-2 px-3.5 bg-secondary-light hover:bg-secondary-lighter duration-150 ease-in-out disabled:bg-grey-30 disabled:text-grey-70 disabled:cursor-not-allowed"
                  onClick={() => handleAddProducts(selectedProducts)}
                  disabled={!customer}
              >
                {customer ? "Produkte hinzufügen" : "Melde dich zuerst an"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
