import {useState, useEffect} from 'react';

const useHttpErrorHandler = axios => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    }, error => Promise.reject(error));
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        setError(error);
        return Promise.reject(error);
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
        // eslint-disable-next-line
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;