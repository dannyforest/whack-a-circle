import React, {useEffect, useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
import { signOut } from '@aws-amplify/auth'
import { DataStore } from '@aws-amplify/datastore'
import { UserScore } from './models'
import { getCurrentUser } from '@aws-amplify/auth'
function App() {
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState("Test User");
    const [missCounter, setMissCounter] = useState(0);
    const [userId, setUserId] = useState("") // Hardcoded user id for now, in a real app this would be the user's sub from cognito
    useEffect(() => {
        getCurrentUser().then(({userId}) => {
            setUserId(userId);
        })
    }, []);

    const handleClick = async () => {
        setCounter(counter + 1);
    
        if (!userId) return;
    
        const userScores  = await DataStore.query(UserScore, (c) => c.userId.eq(userId));
        const original = userScores.length > 0 ? userScores[0] : null;
        if (original) {
            const updatedUserScore = await DataStore.save(
                UserScore.copyOf(original, updated => {
                    updated.score = counter + 1
                })
            );
        } else {
            await DataStore.save(new UserScore({userId: userId, name: name, score: counter + 1}));
        }
    }
    const handleMiss = () => {
        setMissCounter(missCounter + 1);
    }
    return (
        <div className="App">
            <button onClick={() => signOut()}>Sign out</button>
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
