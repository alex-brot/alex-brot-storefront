import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type PosAuthCodesDTO = {
  code: string
  nfcCode: string
}

export const getCodes = async ({}): Promise<{
  response: {
    posAuth: PosAuthCodesDTO
  }
}> => {

    const headers = {
        ...(await getAuthHeaders()),
      }
  const posAuth = await sdk.client.fetch<PosAuthCodesDTO>(`/store/pos-auth`, {
    method: "GET",
    headers,
  })

  return {
    response: {
      posAuth,
    },
  }
}
