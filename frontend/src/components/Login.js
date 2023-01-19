import React from 'react'
import { Redirect } from 'react-router-dom';
import { useState } from 'react';


function Login({ loggedIn, onLogin }) {
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
        if (!userData) {
            return;
        }
        onLogin(userData);
        if (loggedIn) {
            return <Redirect to="/" />
        }
    }

    return (
        <div className="page">
            <div className="login">
                <h2 className="login__title">Вход</h2>
                <form
                    onSubmit={handleSubmit}
                    className='login__form'
                    name='login__form'
                    noValidate=""
                >
                    <fieldset className="login__border">
                        <input
                            value={userData?.email}
                            onChange={handleChange}
                            id="email-input"
                            type="text"
                            name="email"
                            className="login__form-item login__form-item_type_email"
                            placeholder="Email"
                            minLength={2}
                            maxLength={40}
                            required=""
                        />
                        <input
                            value={userData?.password}
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
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;