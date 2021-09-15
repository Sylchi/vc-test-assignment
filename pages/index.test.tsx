/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Index from './index'

test('loads and displays greeting', async () => {
  render(<Index user={{ firstName: 'Ken', lastName: 'Kauksi' }}/>)
  expect(screen.getByRole('button')).toHaveTextContent('Sign out')
  expect(await screen.findByRole('greeting')).toHaveTextContent(`Hello Ken Kauksi!`)
})