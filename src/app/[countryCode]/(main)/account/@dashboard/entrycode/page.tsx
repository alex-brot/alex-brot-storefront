import { listOrders } from '@lib/data/orders'
import { getCodes } from '@lib/data/pos-auth'
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

  let {
    response: { posAuth },
  } = await getCodes({})
  
  return (
    <div>
      <EntryCode code={posAuth.code} />
    </div>
  )
}

