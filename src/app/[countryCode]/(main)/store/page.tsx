import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { retrieveCustomer } from "@lib/data/customer"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  // const searchParams = await props.searchParams;
  // const { sortBy, page } = searchParams

  const customer = await retrieveCustomer().catch(() => null)

  console.log(customer)

  if (!customer) {
    redirect("/account")
  }

  return (
    <>
      <div className="h-16"></div>
      <StoreTemplate
        // sortBy={sortBy}
        // page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}
