import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliry from '../Auxilliry/Auxilliry';

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {
        const [errorState, setErrorState] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setErrorState(null);
            return req;
        }, error => Promise.reject(error));
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setErrorState(error);
            return Promise.reject(error);
        });

        useEffect(() => {
            return () => {
                console.log('Clean up work with Interceptors...');
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
            // eslint-disable-next-line
        }, []);

        const errorConfirmedHandler = () => {
            setErrorState(null);
        }

        return (
            <Auxilliry>
                <Modal
                    show={errorState}
                    modalClosed={errorConfirmedHandler}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilliry>
        );
    };
};

export default withErrorHandler;