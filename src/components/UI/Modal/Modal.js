import React from 'react';

import classes from './Modal.module.css';
import Auxilliry from '../../../hoc/Auxilliry/Auxilliry';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
    <Auxilliry>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxilliry>
);

const areEqual = (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
}

export default React.memo(Modal, areEqual);