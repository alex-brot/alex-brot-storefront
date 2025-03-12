"use client"

import { PosAuthCodesDTO } from "@lib/data/pos-auth"
import { Button, Tooltip } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React, { useState } from "react"

const EntryCode = ({ posAuth }: { posAuth: PosAuthCodesDTO | undefined }) => {
  const [isRevealed, setIsRevealed] = useState(false)

  const toggleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  if (!posAuth || posAuth.code.length === 0) {
    return (
      <div>
        <div
          className="w-full flex flex-col items-center"
          data-testid="no-orders-container"
        >
          <h2 className="text-lg font-semibold">Nothing to see here</h2>
          <p className="text-base-regular">
            Don&apos;t have a code yet? Let us <strong>change that!</strong>
          </p>
          <div className="mt-4">
            <LocalizedClientLink href="/" passHref>
              <Button data-testid="continue-shopping-button">
                Make your first order
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-4 flex flex-col items-center justify-center gap-y-1">
        <h1 className="text-2xl font-bold mb-8">Your Personal Code</h1>
        <Tooltip content="Click to reveal the code">
          <div
            className="flex items-center gap-x-2 w-52 cursor-pointer"
            onClick={toggleReveal}
          >
            {posAuth.code.split("").map((_, index) => {
              return (
                <div
                  id={index.toString()}
                  className="flex items-center justify-center gap-x-2 w-11 bg-neutral-200 h-20 border-2 border-neutral-400 rounded-md"
                  key={index}
                >
                  <h1 className="text-4xl">
                    {isRevealed ? posAuth.code[index] : "*"}
                  </h1>
                </div>
              )
            })}
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default EntryCode
