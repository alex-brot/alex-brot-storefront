'use client'

import { Button, Input, Tooltip } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React, { useState } from "react"

const EntryCode = ({code}: {code: string}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  if(!code || code.length === 0) {
    return (
      <div
        className="w-full flex flex-col items-center gap-y-4"
        data-testid="no-orders-container"
      >
        <h2 className="text-large-semi">Nothing to see here</h2>
        <p className="text-base-regular">
          You don&apos;t have any orders yet, let us change that {":)"}
        </p>
        <div className="mt-4">
          <LocalizedClientLink href="/" passHref>
            <Button data-testid="continue-shopping-button">
              Continue shopping
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-2xl font-bold mb-8">Your code is:</h1>
      <Tooltip content="Click to reveal the code">
        <div className="flex items-center gap-x-2 w-52" onClick={toggleReveal}>
          {code.split("").map((_, index) => {
            return (
              <div
                id={index.toString()}
                className="flex items-center justify-center gap-x-2 w-11 bg-neutral-200 h-20 border-2 border-neutral-400 rounded-md"
              >
                <h1 className="text-4xl">{isRevealed ? code[index] : "*"}</h1>
              </div>
            )
          })}
        </div>
      </Tooltip>
    </div>
  )
};

export default EntryCode;
