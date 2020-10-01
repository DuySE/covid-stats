import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../components/Pagination';

describe('test rendering', () => {
  it('renders without crashing', () => {
    let props = {
      summary: [],
      paginate: jest.fn(),
      total: 0
    }
    const div = document.createElement('div');
    ReactDOM.render(<Pagination {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
