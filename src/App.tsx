import React, {useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
import GameButton from "./Components/GameButton";

function App() {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }
    const handleReset=()=>{
        setCounter(0);

    }
    return (
        <div className="App">
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                handleClick={() => handleClick()} />
            <GameButton handleReset={() =>  handleReset()} />
            <p>{counter}</p>
        </div>
    );
}

export default App;
