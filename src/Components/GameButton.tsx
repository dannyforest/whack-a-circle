import React from 'react';
import Button from "./Button";
interface GameButtonProps {
    handleReset: () => void;
}

const GameButton = ({ handleReset }:GameButtonProps) => {
    return (
        <Button
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
            }}
            onClick={handleReset}
        >
           Reset
        </Button>
    );
}

export default GameButton;