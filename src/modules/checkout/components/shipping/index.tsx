"use client"

import { RadioGroup, Radio } from "@headlessui/react"
import { useCustomerMe } from "@lib/context/customerMe"
import {
  setOrderAddressPickUp,
  setShippingMethod,
} from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Directions, Loader } from "@medusajs/icons"
import {
  HttpTypes,
  StoreCartShippingMethod,
  UpdateShippingMethodDTO,
} from "@medusajs/types"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
  customer: HttpTypes.StoreCustomer | null
}

const PickUp: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
  customer,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  useEffect(() => {
    setIsLoadingPrices(true)

    if (availableShippingMethods?.length) {
      const promises = availableShippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = async () => {
    const shippingMethod = availableShippingMethods?.filter(
      (sm) => sm.id === shippingMethodId
    )[0]

    if (shippingMethod && shippingMethod.data?.address) {
      console.log("everything valid in address here")
      console.log(shippingMethod.data.address)

      const address = shippingMethod.data.address

      // const customer = await getCurrentCustomer()

      if (!customer) {
        return
      }
      await setOrderAddressPickUp(
        address.street,
        address.city,
        address.zip,
        address.country,
        customer
      )

      console.log("should be done now")
    }

    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (id: string) => {
    setError(null)
    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Pick Up
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div data-testid="delivery-options-container">
          <div className="pb-8">
            <RadioGroup
              value={shippingMethodId}
              onChange={handleSetShippingMethod}
            >
              {availableShippingMethods?.map((option) => {
                const isDisabled =
                  option.price_type === "calculated" &&
                  !isLoadingPrices &&
                  typeof calculatedPricesMap[option.id] !== "number"

                return (
                  <Radio
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    disabled={isDisabled}
                    className={clx(
                      "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                      {
                        "border-ui-border-interactive":
                          option.id === shippingMethodId,
                        "hover:shadow-brders-none cursor-not-allowed":
                          isDisabled,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-4">
                      <MedusaRadio checked={option.id === shippingMethodId} />
                      <span className="text-base">{option.name}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Directions />
                      <h1 className="text-base">
                        {option.data?.address?.street} in{" "}
                        {option.data?.address?.zip} {option.data?.address?.city}{" "}
                        {option.data?.address?.country}
                      </h1>
                    </div>
                    <span className="justify-self-end text-ui-fg-base text-base">
                      {option.price_type === "flat" ? (
                        convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code,
                        })
                      ) : calculatedPricesMap[option.id] ? (
                        convertToLocale({
                          amount: calculatedPricesMap[option.id],
                          currency_code: cart?.currency_code,
                        })
                      ) : isLoadingPrices ? (
                        <Loader />
                      ) : (
                        "-"
                      )}
                    </span>
                  </Radio>
                )
              })}
            </RadioGroup>
          </div>

          <ErrorMessage
            error={!customer?.addresses[0] ? "Please add an address" : error}
            data-testid="delivery-option-error-message"
          />
          {!customer?.addresses[0] && (
            <Button
            size="large"
            className="mr-2"
              onClick={() =>
                router.push("/account/addresses")
              }
            >
              Add an address 
            </Button>
          )}

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!cart.shipping_methods?.[0] || !customer?.addresses[0]}
            data-testid="submit-delivery-option-button"
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.shipping_methods?.at(-1)?.name}{" "}
                  {convertToLocale({
                    amount: cart.shipping_methods.at(-1)?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default PickUp
