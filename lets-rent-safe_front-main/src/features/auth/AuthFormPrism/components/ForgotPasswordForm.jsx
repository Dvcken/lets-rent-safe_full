// src/features/auth/components/ForgotPasswordForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';

export const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });

    const onForgotSubmit = (data) => {
        console.log('Email для сброса пароля:', data);
        // Здесь будет вызов API
    };

    return (
        <div className={styles.content}>
            <h2>Смена пароля</h2>
            <small>Введите ваш email, и мы вышлем ссылку для сброса пароля</small>
            <form onSubmit={handleSubmit(onForgotSubmit)}>
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="e-mail"
                        {...register('forgotEmail', {
                            required: 'Email обязателен',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Введите корректный email'
                            }
                        })}
                    />
                    <label>e-mail</label>
                    {errors.forgotEmail && <span className={styles.error}>{errors.forgotEmail.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value="Отправить" />
                </div>
            </form>
        </div>
    );
};