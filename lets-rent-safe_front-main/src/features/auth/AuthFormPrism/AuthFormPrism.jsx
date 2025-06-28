// src/features/auth/AuthFormPrism.jsx
import React, { useState } from 'react';
import styles from './AuthFormPrism.module.scss';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
//import { ForgotPasswordForm } from './components/ForgotPasswordForm';

const AuthFormPrism = () => {
    const [activeFace, setActiveFace] = useState('login');

    const prismTransforms = {
        login: 'translateZ(-10rem) rotateY(0deg)',
        signup: 'translateZ(-10rem) rotateY(-90deg)',
        //forgotPassword: 'translateZ(-10rem) rotateY(-180deg)',
    };

    return (
        <div>
            <ul className={styles.nav}>
                <li onClick={() => setActiveFace('login')}>Вход</li>
                <li onClick={() => setActiveFace('signup')}>Регистрация</li>
                {/*<li onClick={() => setActiveFace('forgotPassword')}>Смена пароля</li>*/}
            </ul>

            <div className={styles.wrapper}>
                <div
                    className={styles.recPrism}
                    style={{ transform: prismTransforms[activeFace] }}
                >
                    {/* Грань 1: Вход (Front) */}
                    <div className={`${styles.face} ${styles.faceFront}`}>
                        <LoginForm
                            onForgotPassword={() => setActiveFace('forgotPassword')}
                            onSignup={() => setActiveFace('signup')}
                        />
                    </div>

                    {/* Грань 2: Регистрация (Right) */}
                    <div className={`${styles.face} ${styles.faceRight}`}>
                        <SignupForm onLogin={() => setActiveFace('login')} />
                    </div>

                    {/* Грань 3: Смена пароля (Back) */}
                    {/* <div className={`${styles.face} ${styles.faceBack}`}>
                        <ForgotPasswordForm />
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default AuthFormPrism;