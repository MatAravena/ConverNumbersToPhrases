/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
    label: string;
    value: number;
    maximunValue: number;
    decimals: number;
    onChange: (value: number) => void;
}

const NumberFormatCustom: React.FC<any> = (props) => {
    const { inputRef, onChange, ...otherProps } = props;

    return (
        <NumericFormat
            {...otherProps}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator=" "
            decimalSeparator=","
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={2}
            max={999999999.99}
        />
    );
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onChange, maximunValue }) => {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    };

    const [displayValue, setDisplayValue] = useState<string | number>(() => formatCurrency(value));

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = parseNumericValue(inputValue, maximunValue);

        if (!isNaN(numericValue))
            onChange(numericValue);

        setDisplayValue(numericValue);
    };

    const parseNumericValue = (input: string, maximun: number): number => {
        const cleanValue = input.replace(/[^0-9.,]/g, '');
        const pseudoStandar = cleanValue.replace(/,/g, '.');
        let parsedValue = parseFloat(pseudoStandar);

        if (!isNaN(parsedValue))
            parsedValue = Math.min(parsedValue, maximun);

        return parsedValue;
    };

    return (
        <TextField
            label={label}
            value={displayValue}
            onChange={handleInputChange}
            type="text"
            InputProps={{
                inputComponent: NumberFormatCustom as any,
            }}
        />
    );
};

export default CurrencyInput;

//import React, { ChangeEvent } from 'react';
//import TextField from '@mui/material/TextField';
//interface CurrencyInputProps {
//    label: string;
//    value: number;
//    onChange: (value: number) => void;
//}

//const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onChange }) => {
//    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//        const inputValue = parseFloat(parseFloat(event.target.value.replace('[0-9].', '')).toFixed(2));
//        console.log('event', event.target.value)
//        console.log('event replace', event.target.value.replace('.', ''))
//        console.log('inputValue', inputValue)

//        onChange(inputValue > 999999999.99 ? 999999999.99 : inputValue || 0);
//    };

//    const formatCurrency = (value: number) => {
//        return value.toLocaleString('de-DE', {
//            //style: 'currency',
//            //currency: 'USD',
//            //maximumFractionDigits: 2,
//            //minimumFractionDigits: 2
//        });
//    };

//    return (
//        <TextField
//            label={label}
//            value={formatCurrency(value)}
//            onChange={handleInputChange}
//            type="text"
//            thousandSeparator = "."
//            decimalSeparator = ","
//            isNumericString
//            decimalScale={2}
//            allowNegative = { false}
//            allowLeadingZeros = { false}
//        />
//    );
//};
//export default CurrencyInput;
