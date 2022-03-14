import { by, device, element, expect } from 'detox'

describe('Given I open App ', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('Then I should see Restart Button, And I should see steps counts, And I should see Cards', async () => {
    await expect(element(by.text('Restart'))).toBeVisible()
    await expect(element(by.text('STEPS:'))).toBeVisible()
    await expect(element(by.id('StepCounter'))).toHaveText('0')
    await expect(element(by.text('?')).atIndex(11)).toBeVisible()
  })
})
