import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PopUpFood from '../pages/PopupFood'
import EatList from '../pages/Eat'
import { render, fireEvent, wait, waitFor, screen } from '@testing-library/react'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Order', () => {
  test('show breakfast', async () => {
    let show = false
    let price = 1
    let itemName = 'Food'
    const { getByText } = render(<EatList />)
    //const text = screen.getByText('Breakfast')
    const titles = screen.getAllByRole('title')
    expect(titles[0]).toHaveTextContent('Breakfast')
    //expect(title).toHaveTextContent('Food Price')
  })
  test('click on breakfast', async () => {
    jest.setTimeout(30000);
    let show = false
    let price = 1
    let itemName = 'Food'
    const { getByText, getByTestId } = render(<EatList />)
    //const text = screen.getByText('Breakfast')
    fireEvent.click(getByTestId('Breakfast'))
    await wait(() => {
      const rettext = getByText(/Price/i)
      expect(rettext).toHaveTextContent('Breakfast Price')
    });
  })
})
