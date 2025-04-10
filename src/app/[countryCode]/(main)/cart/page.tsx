import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  const cart = await retrieveCart()
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    redirect("/account")
  }

  if (!cart) {
    return notFound()
  }

  return <CartTemplate cart={cart} customer={customer} />
}
