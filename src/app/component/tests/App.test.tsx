import * as React from 'react';

import { shallow } from 'enzyme';

import Content from '../Content';
import Footer from '../Footer';
import Header from '../Header';

import App from '../App';


test('should render Header, Content and Footer', () => {
    const app = shallow(<App />).dive();

    expect(app.find(Header)).toHaveLength(1);
    expect(app.find(Content)).toHaveLength(1);
    expect(app.find(Footer)).toHaveLength(1);
});
