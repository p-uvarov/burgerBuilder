import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('Should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                userID: null,
                token: null,
                error: null,
                loading: null,
                authRedirectPath: '/'
            }
        );
    });

    it('Should return correct state with userID and token after success authentification.', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            userID: 'some-user-id',
            token: 'some-token'
        })).toEqual({
            userID: 'some-user-id',
            token: 'some-token',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

});