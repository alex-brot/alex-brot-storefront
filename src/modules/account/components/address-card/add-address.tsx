"use client"

import { Plus } from "@medusajs/icons"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import AddressModal from "@modules/common/components/address-modal"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const { state, open, close: closeModal } = useToggleState(false)

  return (
    <>
      <button
        className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi">New address</span>
        <Plus />
      </button>

      <AddressModal
        addresses={addresses}
        region={region}
        state={state}
        closeModal={closeModal}
      />
    </>
  )
}

export default AddAddress
