import React from 'react';
import { Form } from 'react-bootstrap';

const CustomPhoneInput = ({ value, onChange, placeholder = '8 (999) 500-50-50', tabIndex }) => {
    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const withPrefix = cleaned.startsWith('8') || cleaned.length === 0 ? cleaned : `8${cleaned}`;
        const trimmed = withPrefix.slice(0, 11);

        let formattedValue = '';

        if (trimmed.length > 0) {
            formattedValue += '8';
        }
        if (trimmed.length > 1) {
            formattedValue += ` (${trimmed.slice(1, 4)}`;
        }
        if (trimmed.length > 4) {
            formattedValue += `) ${trimmed.slice(4, 7)}`;
        }
        if (trimmed.length > 7) {
            formattedValue += `-${trimmed.slice(7, 9)}`;
        }
        if (trimmed.length > 9) {
            formattedValue += `-${trimmed.slice(9, 11)}`;
        }

        return formattedValue;
    };

    const handleChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        onChange(formattedPhone);
    };

    return (
        <Form.Control
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={18}
            tabIndex={tabIndex}
            style={{
                height: '30px',
                fontSize: '16px',
                border: '2px solid rgba(0, 125, 136, 0.5)',
                borderRadius: '8px',
                padding: '10px 15px',
                color: 'rgba(0, 125, 136, 1)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
            onFocus={(e) => {
                e.target.style.borderColor = 'rgba(37, 203, 161, 1)';
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(37, 203, 161, 0.25)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0, 125, 136, 0.5)';
                e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }}
        />
    );
};

export default CustomPhoneInput;