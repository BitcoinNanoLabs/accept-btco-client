import { EventEmitter } from '@byungi/event-emitter'
import {
  AcceptBtcoPayment,
  isAcceptBtcoPayment,
  isVerifiedAcceptBtcoPayment,
} from './types'
import { logger } from './logger'

export const createWebSocketURL = ({
  baseURL,
  paymentToken,
}: {
  baseURL: string
  paymentToken: AcceptBtcoPayment['token']
}) => `${baseURL}?token=${paymentToken}`

type AcceptBtcoWebSocketEvents = {
  open: () => void
  close: () => void
  error: (error: unknown) => void
  payment_updated: (payment: AcceptBtcoPayment) => void
  payment_verified: (payment: AcceptBtcoPayment) => void
}

export const createWebSocket = (url: string) => {
  const eventEmitter = new EventEmitter<AcceptBtcoWebSocketEvents>()
  const websocket = new WebSocket(url)

  websocket.onopen = () => {
    logger.log('websocket', 'open')
    eventEmitter.emit('open')
  }

  websocket.onclose = () => {
    logger.log('websocket', 'close')
    eventEmitter.emit('close')
  }

  websocket.onerror = error => {
    logger.log('websocket', 'error', error)
    eventEmitter.emit('error', error)
  }

  websocket.onmessage = event => {
    try {
      const payload = JSON.parse(event.data)

      if (isAcceptBtcoPayment(payload)) {
        return isVerifiedAcceptBtcoPayment(payload)
          ? eventEmitter.emit('payment_verified', payload)
          : eventEmitter.emit('payment_updated', payload)
      }

      logger.log('websocket', 'could not cast payload to payment object', {
        event,
        payload,
      })
    } catch (error) {
      eventEmitter.emit('error', error)

      logger.log('websocket', 'could not deserialize message payload', {
        event,
        error,
      })
    }
  }

  return {
    on: eventEmitter.on.bind(eventEmitter),
    close: () => websocket.close(),
  }
}

export type AcceptBtcoWebSocket = ReturnType<typeof createWebSocket>
