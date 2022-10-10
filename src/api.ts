import axios from 'axios'
import {
  AcceptBtcoPayment,
  AcceptBtcoPaymentToken,
  CreateAcceptBtcoPaymentParams,
} from './types'

export const createAPI = ({ baseURL }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: 3000,
  })

  return {
    createPayment: ({
      amount,
      currency,
      state,
    }: CreateAcceptBtcoPaymentParams) => {
      const form = new FormData()

      form.append('amount', amount)
      form.append('currency', currency)
      form.append('state', state || '')

      return instance.post<AcceptBtcoPayment>('/pay', form)
    },

    fetchPayment: ({ token }: { token: AcceptBtcoPaymentToken }) => {
      return instance.get<AcceptBtcoPayment>('/verify', {
        params: {
          token,
        },
      })
    },
  }
}

export type AcceptBtcoAPI = ReturnType<typeof createAPI>
