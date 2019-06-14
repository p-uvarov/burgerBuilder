import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as action from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        authForm: {
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
        },
        isSignupMode: false
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputElementID) => {
        const updateElement = {
            ...this.state.authForm[inputElementID],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.authForm[inputElementID].validation),
            touched: true
        };

        const updatedAuthForm = {
            authForm: {
                ...this.state.authForm,
                [inputElementID]: updateElement
            }
        };

        this.setState(updatedAuthForm);
    };

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignupMode
        );
    }

    switchModeHandler = () => {
        this.setState(prevState => ({ isSignupMode: !prevState.isSignupMode }))
    }


    render() {
        let errorMessage = null;
        
        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.error.message}</p>
            );
        }

        const formElementsArr = [];
        for (let key in this.state.authForm) {
            formElementsArr.push({
                id: key,
                config: this.state.authForm[key]
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        let form = (
            <div>
                <form onSubmit={this.authHandler}>
                    {errorMessage}
                    {inputElements}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchModeHandler}>
                    {this.state.isSignupMode ? 'SIGN IN' : 'Not registered yet? SIGN UP'}
                </Button>
            </div>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {form}
            </div>
        );
    }
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