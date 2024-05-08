import React, {useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";

function App() {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }

    return (
        <div className="App">
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                handleClick={() => handleClick()} />
            <p>{counter}</p>
        </div>
    );
}

export default App;
