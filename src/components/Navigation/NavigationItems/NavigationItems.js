import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked} >Burger Builder</NavigationItem>
        {props.isAuth 
            ? <NavigationItem link="/orders" clicked={props.clicked}>Orders</NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem link="/logout" clicked={props.clicked}>Log out</NavigationItem>
            : <NavigationItem link="/auth" clicked={props.clicked}>Sign in</NavigationItem>}
    </ul>
);

export default navigationItems;