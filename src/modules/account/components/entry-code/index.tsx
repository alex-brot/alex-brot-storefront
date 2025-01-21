'use client'

import { Button, Input } from "@medusajs/ui"
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
    <>
      <h2>Your code is:</h2>
      <div className="flex items-center gap-x-2">
        <Input
          className="align-middle"
          value={isRevealed ? code : "****"}
          disabled
        />
        <Button onClick={toggleReveal}>
          {isRevealed ? "Hide" : "Reveal"} Code
        </Button>
      </div>
    </>
  )
};

export default EntryCode;
