import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"
import { retrieveCustomer } from "@lib/data/customer"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    return null
  }

  return <CartDropdown cart={cart} />
}
