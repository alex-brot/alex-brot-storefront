import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { getCodes } from "@lib/data/pos-auth"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  let {
    response: { posAuth },
  } = await getCodes({})

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} posAuth={posAuth} />
}
