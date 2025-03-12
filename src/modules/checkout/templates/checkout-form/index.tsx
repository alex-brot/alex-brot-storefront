import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import PickUp from "@modules/checkout/components/shipping"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  shippingMethods?.forEach((method) => {
    console.log(method)
  })
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
        {/* <Addresses cart={cart} customer={customer} />  */}

        <PickUp cart={cart} availableShippingMethods={shippingMethods} customer={customer}/>

        <Payment cart={cart} availablePaymentMethods={paymentMethods} />

        <Review cart={cart} />
    </div>
  )
}
