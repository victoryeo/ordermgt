import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PopUpFood from '../pages/PopUpFood'
import EatList from '../pages/Eat'
import { render, fireEvent, wait, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { FirstStore } from '../store/FirstStore'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Order', () => {
  test('should show breakfast title', async () => {
    let show = false
    let price = 1
    let itemName = 'Food'
    render(
      <Provider store={FirstStore}>
      <EatList />
      </Provider>
    )
    //const text = screen.getByText('Breakfast')
    const titles = screen.getAllByRole('title')
    expect(titles[0]).toHaveTextContent('Breakfast')
    //expect(title).toHaveTextContent('Food Price')
  })
  test('can click on breakfast', async () => {
    jest.setTimeout(30000);
    let show = false
    let price = 1
    let itemName = 'Food'
    const { getByText, getByTestId } = render(
      <Provider store={FirstStore}>
      <EatList />
      </Provider>
    )
    fireEvent.click(getByTestId('Breakfast'))
    await wait(() => {
      const rettext = getByText(/Price/i)
      expect(rettext).toHaveTextContent('Breakfast Price')
    })
  })
  test('check on breakfast price', async () => {
    jest.setTimeout(30000);
    let show = false
    let price = 1
    let itemName = 'Food'
    const { getByText, getByTestId } = render(
      <Provider store={FirstStore}>
      <EatList />
      </Provider>
    )
    fireEvent.click(getByTestId('Breakfast'))
    await wait(() => {
      const rettext = getByText(/Order Status/i)
      expect(rettext).toHaveTextContent('20')
    })
  })
  test('can click on order button in breakfast', async () => {
    jest.setTimeout(30000);
    //const handleOrder = jest.fn()
    const logSpy = jest.spyOn(console, 'log');
    const { getByText, getByTestId } = render(
      <Provider store={FirstStore}>
      <EatList />
      </Provider>
    )
    fireEvent.click(getByTestId('Breakfast'))
    await wait(() => {
      fireEvent.click(getByTestId('order'))
      console.log(logSpy)
      expect(logSpy).toBeCalledWith('handleOrder')
    })
  })
})
