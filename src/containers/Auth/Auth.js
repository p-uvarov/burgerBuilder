import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as action from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [authFormState, setAuthFormState] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        }
    });

    const [isSignupModeState, setIsSignupModeState] = useState(false);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/');
        };
        // eslint-disable-next-line
    }, []);

    const inputChangedHandler = (event, inputElementID) => {
        const updatedAuthForm = updateObject(authFormState, {
            [inputElementID]: updateObject(authFormState[inputElementID], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authFormState[inputElementID].validation),
                touched: true
            })
        });

        setAuthFormState(updatedAuthForm);
    };

    const authHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            authFormState.email.value,
            authFormState.password.value,
            isSignupModeState
        );
    }

    const switchModeHandler = () => {
        setIsSignupModeState(prevState => !prevState);
    };

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p style={{ color: 'red', fontWeight: 'bold' }}>{props.error.message}</p>
        );
    }
    const formElementsArr = [];
    for (let key in authFormState) {
        formElementsArr.push({
            id: key,
            config: authFormState[key]
        });
    }

    const inputElements = formElementsArr.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    let form = (
        <div>
            <form onSubmit={authHandler}>
                {errorMessage}
                {inputElements}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchModeHandler}>
                {isSignupModeState ? 'SIGN IN' : 'Not registered yet? SIGN UP'}
            </Button>
        </div>
    )

    if (props.loading) {
        form = <Spinner />
    }

    let authRedirect = null;

    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignupMode) => dispatch(action.auth(email, password, isSignupMode)),
        onSetAuthRedirectPath: path => dispatch(action.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
