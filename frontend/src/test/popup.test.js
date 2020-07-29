/* Dependencies */
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import image from '../assets/eddy01.jpg'
/* Components */
import PopUp from '../pages/Popup'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('PopUp', () => {
  it('should render one tag', () => {
    const wrapper = shallow(<PopUp/>)
    console.log(wrapper)
    const pu = wrapper.find('Modal')
    expect(pu).toHaveLength(1)
    //expect(wrapper.find("img").prop("src")).toEqual(image)
  })
})
