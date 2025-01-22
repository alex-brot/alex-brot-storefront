import { listOrders } from '@lib/data/orders'
import { getCodes } from '@lib/data/pos-auth'
import { Button } from '@medusajs/ui'
import EntryCode from '@modules/account/components/entry-code'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { notFound } from 'next/navigation'

import React from 'react'

export default async function EntryCodePage() {
  let {
    response: { posAuth },
  } = await getCodes({})
  
  console.log(posAuth)


  return (
    <div>
      <EntryCode posAuth={posAuth} />
    </div>
  )
}

