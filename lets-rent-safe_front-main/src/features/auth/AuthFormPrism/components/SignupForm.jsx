// src/features/auth/components/SignupForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';
import clsx from 'clsx';
import { createClient } from '../../../../api/endpoints/client';

export const SignupForm = ({ onLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm({
        mode: 'onBlur',
        defaultValues: { userType: 'user' }
    });

    const userType = watch('userType');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const onSignupSubmit = async (data) => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            await createClient(data);
            setSuccess(true);
            reset();
        } catch (e) {
            setError(e.message || 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.content}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSignupSubmit)}>
                {/* --- НАШ НОВЫЙ ПЕРЕКЛЮЧАТЕЛЬ --- */}
                <div className={styles.userTypeSwitcher}>
                    <button
                        type="button" // Важно: чтобы кнопка не отправляла форму
                        className={clsx(userType === 'user' && styles.activeType)}
                        onClick={() => setValue('userType', 'user', { shouldValidate: true })}
                    >
                        Пользователь
                    </button>
                    <button
                        type="button"
                        className={clsx(userType === 'developer' && styles.activeType)}
                        onClick={() => setValue('userType', 'developer', { shouldValidate: true })}
                    >
                        Застройщик
                    </button>
                </div>

                {/* Скрытое поле, которое react-hook-form будет использовать для хранения значения */}
                <input type="hidden" {...register('userType', { required: true })} />

                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="Имя"
                        {...register('firstName', { required: 'Имя обязательно' })}
                    />
                    <label>Имя</label>
                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        {...register('lastName', { required: 'Фамилия обязательна' })}
                    />
                    <label>Фамилия</label>
                    {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="Номер"
                        {...register('phone', { required: 'Номер обязателен' })}
                    />
                    <label>Номер телефона</label>
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value={loading ? 'Создание...' : 'Создать аккаунт'} disabled={loading} />
                </div>
                {success && <div style={{ color: 'green', marginBottom: 10 }}>Аккаунт успешно создан!</div>}
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formLinks}>
                    <span className={styles.singin} onClick={onLogin}>Уже есть аккаунт? Войти</span>
                </div>
            </form>
        </div>
    );
};