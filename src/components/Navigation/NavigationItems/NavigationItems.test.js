import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('Should render 3 navigation items if user is authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuth={true} />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Should render 2 navigation items', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});