import React, {useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
function App() {
    const [counter, setCounter] = useState(0);
    const [missCounter, setMissCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }
    const handleMiss = () => {
        setMissCounter(missCounter + 1);
    }
    return (
        <div className="App">
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                handleClick={() => handleClick()}
                handleMiss={() => handleMiss()}
                 />
            <div style={{ padding: "20px", backgroundColor: "lightcyan", fontSize: "30px", fontWeight: "bolder" }}>Hits: {counter} Misses: {missCounter}</div>
        </div>
    );
}

export default App;
