import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from '../components/Autocomplete';
import { mount, shallow } from 'enzyme';

describe('test rendering', () => {
  it('renders without crashing', () => {
    let props = {
      countries: [],
      search: jest.fn()
    };
    const div = document.createElement('div');
    ReactDOM.render(<Autocomplete {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('test event handler', () => {
  it('test onChange of input', () => {
    let props = {
      search: jest.fn(),
      countries: []
    };
    const event = {
      currentTarget: { value: 'n' }
    };
    const wrapper = shallow(<Autocomplete {...props} />);
    wrapper.find('input').simulate('change', event);
    expect(wrapper.find('input').prop('value')).toEqual('n');
  });
});
