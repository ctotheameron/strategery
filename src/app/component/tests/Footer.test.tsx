import * as React from 'react';

import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';

import Footer from '../Footer';


test('should espouse our greatness', () => {
    const footer = shallow(<Footer />).dive();
    const typography = footer.find(Typography);

    expect(typography.children().text()).toContain('great');
});
