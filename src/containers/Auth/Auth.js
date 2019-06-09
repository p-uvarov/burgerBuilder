import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
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
        }
    }

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
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value);
    }


    render() {
        const formElementsArr = [];
        for (let key in this.state.authForm) {
            formElementsArr.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let inputElements = formElementsArr.map(formElement => (
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

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.authHandler}>
                    {inputElements}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(action.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);