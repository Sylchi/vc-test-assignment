/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import {render, screen} from '@testing-library/react'
 import '@testing-library/jest-dom'
 import SubmitButton from '../../components/SubmitButton'
 
 test('Button label is correct', async () => {
   render(<SubmitButton label="Test label" loading={false} onClick={() => null}  />)
   expect(screen.getByRole('button')).toHaveTextContent('Test label');
 })

 test('Button onClick handler works', async () => {
  const onClick = jest.fn();
  render(<SubmitButton label="Test label" loading={false} onClick={onClick} />)
  screen.getByRole('button').click();
  expect(onClick).toHaveBeenCalled();
})

test('Button loading indicator works', async () => {
  render(<SubmitButton label="Test label" loading={true} onClick={() => null} />)
  expect(screen.getByRole('button')).not.toHaveTextContent('Test label');
})