import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliry from '../Auxilliry/Auxilliry';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <Auxilliry>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilliry>
        );
    };
};

export default withErrorHandler;