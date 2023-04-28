import { AcceptBtcoPayment } from './types'

export const mockAPIHost = 'https://wallet.bitcoinnano.org'

export const mockAcceptBtcoPayment: AcceptBtcoPayment = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  account: 'nano_3c9pkkgdy5n8qkkrzj96ncjnpcbuj6ux3177wawn1wu5ynoejquumbffdxny',
  amount: '0.000001',
  amountInCurrency: '0.000001',
  currency: 'BTCO',
  balance: '0',
  subPayments: {},
  remainingSeconds: 14399,
  state: '',
  fulfilled: false,
  merchantNotified: false,
}

export const mockVerifiedAcceptBtcoPayment: AcceptBtcoPayment = {
  ...mockAcceptBtcoPayment,
  merchantNotified: true,
}

export const createMockAPIResponse = (payment = mockAcceptBtcoPayment) => ({
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: payment,
})

export const clearDOM = () => {
  document.getElementsByTagName('body')[0].innerHTML = ''
}
