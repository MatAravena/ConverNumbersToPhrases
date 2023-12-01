import { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import CurrencyInput from './components/CurrencyInput';

function App() {
    const [phrase, setPhrase] = useState<string>('');
    const [number, setNumber] = useState<number>(0);

    const handleAmountChange = (value: number) => { 
        setNumber(() => {
            let parsedValue = Math.min(value, 999999999.99);
            parsedValue = parseFloat(parsedValue.toFixed(2));
            return parsedValue;
        });
    };

    return (
        <div>
            <h1 id="tabelLabel">Quantic Test</h1>
            <div className="rowInput" >
                <CurrencyInput label="Amount" value={number} onChange={handleAmountChange} maximunValue={999999999.99} decimals={2} />
                <Button variant="contained" 
                    onClick={() => { getConvertion() }}>
                    Send
                </Button>
            </div>
            <br /> 
            <p>{phrase}</p>
        </div>
    );

    async function getConvertion() {
        try {
            const response = await fetch('http://localhost:5190/Convertor', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({
                //    numberReceived: number,
                //}),
                body: JSON.stringify( number ),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setPhrase(data);

        } catch (error) {
            setPhrase(`Error:' ${error}`);
        }
    }
}

export default App;
