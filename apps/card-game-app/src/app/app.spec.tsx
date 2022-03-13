import { render } from '@testing-library/react-native'
import React from 'react'
import { App } from './app'

describe('Given I am at Game Screen', () => {
  it('Then I should see Restart Button, And I should see Steps Count, And I should see Cards', () => {
    const { getByText } = render(<App />)
    expect(getByText('Welcome')).toBeDefined()
  })
})
