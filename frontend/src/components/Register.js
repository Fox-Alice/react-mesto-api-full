import React from 'react'
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function Register({ loggedIn, onRegister }) {

    const [userData, setUserData] = useState(null);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (userData) {
            let { email, password } = userData;
            onRegister({ email, password });
        }
        if (loggedIn) {
            return <Redirect to="/" />
        }
    }

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form
                onSubmit={handleSubmit}
                className='login__form'
                name='login__form'
                noValidate=""
            >
                <fieldset className="login__border">
                    <input
                        defaultValue={userData?.email}
                        onChange={handleChange}
                        id="register_email-input"
                        type="text"
                        name="email"
                        className="login__form-item login__form-item_type_email"
                        placeholder="Email"
                        minLength={2}
                        maxLength={40}
                        required=""
                    />
                    <input
                        defaultValue={userData?.password}
                        onChange={handleChange}
                        id="password-input"
                        type="password"
                        name="password"
                        className="login__form-item login__form-item_type_password"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={200}
                        required=""
                    />
                </fieldset>
                <button
                    className="login__save-button"
                    aria-label="save"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>
            <Link to="/signin" className="register__signup-link">Уже зарегистрированы? Войти</Link>
        </div>
    );
}

export default Register;