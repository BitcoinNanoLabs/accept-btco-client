import * as acceptBtco from './index'

describe('acceptBtco', () => {
  it('exposes the snapshotted API', () => {
    expect(acceptBtco).toMatchInlineSnapshot(`
      Object {
        "createSession": [Function],
        "isAcceptBtcoPayment": [Function],
        "isVerifiedAcceptBtcoPayment": [Function],
      }
    `)
  })
})
