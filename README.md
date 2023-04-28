# accept-btco-client

![Build State and Publish](https://github.com/bitcoinnanolabs/accept-btco-client/actions/workflows/npm-publish.yml/badge.svg)
![npm (scoped)](https://img.shields.io/npm/v/accept-btco)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/accept-btco)
![GitHub](https://img.shields.io/github/license/accept-btco/accept-btco-client)

Payment gateway for [NANO](https://btco.org)

_accept-btco-client_ is a JavaScript package that helps you to communicate with [_accept-btco_](https://github.com/accept-btco/accept-btco) for receiving NANO payments easily in your client-side applications.

## Installation

### via NPM

```bash
npm install accept-btco

yarn add accept-btco
```

#### ES Modules / TypeScript

```ts
import * as acceptBtco from 'accept-btco'
```

#### CommonJS

```ts
const acceptBtco = require('accept-btco')
```

### Directly in Browser, as a UMD module

After the _accept-btco-client_ script is loaded there will be a global variable called _acceptBtco_, which you can access via `window.acceptBtco`

```HTML
<html>
  <head>
    ...
    <script src="https://unpkg.com/accept-btco@2"></script>
  </head>
  ...
</html>
```

## Usage

### Creating a Payment Session

To be able to initiate the payment process, you **must create a new payment session.**

```ts
// 1- create a new payment session
type CreateSessionParams = {
  apiHost: string // host of your Accept NANO server, without protocol
  pollInterval?: number // time interval (ms) to re-check for verification of a payment (default: 3s)
  debug?: boolean // enables debug mode and prints some useful stuff to console
}

const session = acceptBtco.createSession({
  apiHost: 'accept-btco-demo.put.io',
})

// 2- register event listeners to shape-up your logic based on session events.
type PaymentSessionEvents = {
  start: () => void
  end: (error: PaymentError | null, payment: AcceptBtcoPayment | null) => void
}

session.on('start', () => {
  myApp.paymentStarted()
})

session.on('end', (error, payment) => {
  if (error) {
    return myApp.paymentFailed({ reason: error.reason })
  }

  return myApp.paymentSucceeded({
    amount: payment.amount,
    state: payment.state,
  })
})
```

### Presenting the Payment Overlay

After creating your session and attaching the event listeners, you can follow one of those options to proceed with the payment flow.

#### Option 1: Create a Payment Through Client

If you want to create and verify an _accept-btco_ payment in your client application, you can use this option.

After the payment is created, _accept-btco-client_ will automatically proceed to the verification step.

```ts
type CreatePaymentParams = {
  amount: string // stringified number
  currency: 'NANO' | 'USD'
  state?: string // payload to share between your client and server, will be embedded into the payment object
}

session.createPayment({
  amount: '1',
  currency: 'USD',
  state: '{userId:7}',
})
```

#### Option 2: Verify a Payment Through Client

If you create an _accept-btco_ payment in another context (such as your application's backend), you can use this option to perform the verification in your client application.

```ts
type VerifyPaymentParams = {
  token: string // the Accept NANO payment token created in your backend application
}

session.verifyPayment({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
```

## Contributing

- Please [open an issue](https://github.com/accept-btco/accept-btco-client/issues/new) if you have a question or suggestion.
- Don't create a PR before discussing it first.

## Who is using _accept-btco-client_ in production?

- [Put.io](https://put.io)
- [My Btco Ninja](https://mybtco.ninja)

Please send a PR to list your site if _accept-btco_ is helping you to receive NANO payments.

## Sponsors

[![Browserstack](http://wallpapers-for-ipad.com/fullpage/imgs3/logos/browserstack3.png)](http://www.browserstack.com/)

Cross-browser compatibility is tested with [BrowserStack](https://browserstack.com), thanks for [supporting open source](https://www.browserstack.com/open-source) ❤️️
