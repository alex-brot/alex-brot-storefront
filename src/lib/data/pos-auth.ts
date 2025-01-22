import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type PosAuthCodesDTO = {
  code: string
  nfcCode?: string
}

export const getCodes = async ({}): Promise<{
  response: {
    posAuth: PosAuthCodesDTO | undefined
  }
}> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    const posAuth = await sdk.client.fetch<PosAuthCodesDTO>(`/store/pos-auth`, {
      method: "GET",
      headers,
    })
    return {
      response: {
        posAuth,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      response: {
        posAuth: undefined,
      },
    }
  }
}
