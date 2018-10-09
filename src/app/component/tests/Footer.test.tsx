import * as React from 'react';

import { shallow } from 'enzyme';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Footer, { FooterButton } from '../Footer';


test('should have some copyright', () => {
    const footer = shallow(<Footer />).dive();
    const typography = footer.find(Typography);

    expect(typography.children().text()).toContain('© Pro.com');
});


test('should have some buttons', () => {
    const footer = shallow(<Footer />).dive();
    const buttons = footer.find(FooterButton);

    expect(buttons.length).toBe(2);
});


test('footer button should contain button', () => {
    const footerButton = shallow(<FooterButton>text</FooterButton>).dive();
    const button = footerButton.find(Button);

    expect(button.length).toBe(1);
});
