import { listOrders } from '@lib/data/orders'
import { Button } from '@medusajs/ui'
import EntryCode from '@modules/account/components/entry-code'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { notFound } from 'next/navigation'

import React from 'react'

export default async function EntryCodePage() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div>
      <EntryCode code={"1234"} />
    </div>
  )
}

