import { el, setChildren } from 'redom'
import Big from 'big.js'
import QRCode from 'qrcode'
import { AcceptBtcoPayment } from '../../types'
import { sharedStyles } from '../style'

const multNANO = Big('1000000000000000000000000000000')

const createAccountElements = (account: AcceptBtcoPayment['account']) => {
  const accountHeader = el(
    'h5',
    { style: sharedStyles.infoHeader },
    'Account Address',
  )

  const accountText = el('p', { style: sharedStyles.infoText }, account)

  return { accountHeader, accountText } as const
}

const createAmountElements = (amount: AcceptBtcoPayment['amount']) => {
  const amountHeader = el('h5', { style: sharedStyles.infoHeader }, 'Amount')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const amountText = el('p', { style: sharedStyles.infoText }, `${amount} BITCOIN NANO`)
  return { amountHeader, amountText } as const
}

const createPaymentInfo = (payment: AcceptBtcoPayment) => {
  const { accountHeader, accountText } = createAccountElements(payment.account)
  const { amountHeader, amountText } = createAmountElements(payment.amount)
  return el('div', [accountHeader, accountText, amountHeader, amountText])
}

const createQRCodeElements = (payment: AcceptBtcoPayment) => {
  const amount_raw = Big(payment.amount)
    .times(multNANO)
    .toFixed()
    .toString()

  const qrText = `btco:${payment.account}?amount=${amount_raw}`

  const qrCanvas = el('canvas', {
    style: `
      background: white!important;
      padding: 24px!important;
      border: 1px solid #e9e9e9!important;
      border-radius: 5px!important;
    `,
  })

  const qrContainer = el('a', {
    href: qrText,
    target: '_blank',
    rel: 'noopener',
    style: `
      display: inline-block!important;
      text-decoration: none!important;
    `,
  })

  return { qrText, qrCanvas, qrContainer } as const
}

export const createPaymentScene = (payment: AcceptBtcoPayment) =>
  new Promise<HTMLDivElement>(resolve => {
    const paymentInfo = createPaymentInfo(payment)
    const { qrText, qrCanvas, qrContainer } = createQRCodeElements(payment)

    QRCode.toCanvas(qrCanvas, qrText, (error: unknown) => {
      if (error) {
        return resolve(paymentInfo)
      }

      setChildren(qrContainer, [qrCanvas])
      resolve(el('div', [qrContainer, paymentInfo]))
    })
  })
