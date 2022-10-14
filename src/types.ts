type StringifiedNumber = string
type StringifiedObject = string

export type PaymentError =
  | { reason: 'NETWORK_ERROR'; details: unknown }
  | { reason: 'SESSION_EXPIRED' }
  | { reason: 'USER_TERMINATED' }

export type BtcoAccount = string
export type AcceptBtcoPaymentToken = string
export type AcceptBtcoCurrency = 'BTCO' | 'USD'

export type CreateAcceptBtcoPaymentParams = {
  amount: StringifiedNumber
  currency: AcceptBtcoCurrency
  state?: StringifiedObject
}

export interface AcceptBtcoPayment {
  token: AcceptBtcoPaymentToken
  account: BtcoAccount
  amount: StringifiedNumber
  amountInCurrency: StringifiedNumber
  currency: AcceptBtcoCurrency
  balance: StringifiedNumber
  subPayments: Record<string, unknown>
  remainingSeconds: number
  state: StringifiedObject
  fulfilled: boolean
  merchantNotified: boolean
}

export const isAcceptBtcoPayment = (
  input: unknown,
): input is AcceptBtcoPayment => {
  if (typeof input !== 'object' || !input) {
    return false
  }

  const record = input as Record<string, unknown>
  return Boolean(record.token && record.account && record.currency)
}

export const isVerifiedAcceptBtcoPayment = (input: unknown) =>
  isAcceptBtcoPayment(input) && input.merchantNotified
