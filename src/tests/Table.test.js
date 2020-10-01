import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../components/Table';
import { shallow } from 'enzyme';

describe('test rendering', () => {
  it('renders without crashing', () => {
    let props = {
      summary: [],
      global: {},
      countries: [],
      search: jest.fn()
    };
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
