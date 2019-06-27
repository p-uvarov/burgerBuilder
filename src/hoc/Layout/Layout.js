import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilliry from '../Auxilliry/Auxilliry';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawerState, setShowSideDrawerState] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawerState(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawerState(prevState => !prevState);
    }

    return (
        <Auxilliry>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuth} />
            <SideDrawer
                isAuth={props.isAuth}
                open={showSideDrawerState}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxilliry>
    )
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);