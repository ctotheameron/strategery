import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import config from '../../config';

import Header from '../Header';


const cardsPath = config.paths.cards;
const dicePath = config.paths.dice;


test('should have a title', () => {
    const header = mount(
        <MemoryRouter><Header /></MemoryRouter>
    );

    const typography = header.find(Typography);
    expect(typography.children().text()).toBe('Do A Thing');
});


test('tabValue should default to cardsPath if not matching', () => {
    const header = mount(
        <MemoryRouter><Header /></MemoryRouter>
    );

    const tabs = header.find(Tabs);
    expect(tabs.props()).toMatchObject({
        value: cardsPath
    });
});


test('tabValue should be dicePath if location is "/dice"', () => {
    const header = mount(
        <MemoryRouter initialEntries={['/dice']}><Header /></MemoryRouter>
    );

    const tabs = header.find(Tabs);
    expect(tabs.props()).toMatchObject({
        value: dicePath
    });
});


test('tabValue should be dicePath if location is "/cards"', () => {
    const header = mount(
        <MemoryRouter initialEntries={['/cards']}><Header /></MemoryRouter>
    );

    const tabs = header.find(Tabs);
    expect(tabs.props()).toMatchObject({
        value: cardsPath
    });
});


test('cards tab should link to /cards', () => {
    const header = mount(
        <MemoryRouter><Header /></MemoryRouter>
    );

    const cardsTabProps = header.find(Tab).at(0).props();

    expect(cardsTabProps).toMatchObject({
        label: 'Cards',
        component: expect.any(Function),
        value: cardsPath
    });

    expect(
        cardsTabProps.component({ innerRef: '' })
    ).toMatchObject(<Link to={cardsPath} />);
});


test('dice tab should link to /dice', () => {
    const header = mount(
        <MemoryRouter><Header /></MemoryRouter>
    );

    const diceTabProps = header.find(Tab).at(1).props();

    expect(diceTabProps).toMatchObject({
        label: 'Dice',
        component: expect.any(Function),
        value: dicePath
    });

    expect(
        diceTabProps.component({ innerRef: '' })
    ).toMatchObject(<Link to={dicePath} />);
});
