import React, {useEffect, useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
import {signOut} from "@aws-amplify/auth";
import { DataStore } from 'aws-amplify/datastore';
import {UserScore} from "./models";
import {getCurrentUser} from "aws-amplify/auth";

function App() {
    const [counter, setCounter] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);
    const [name, setName] = useState('');

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

        return (
        <div className="App">
            <div className="leaderboard">
                Longest Streak: {longestStreak}
            </div>
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                handleClick={() => handleClick()}
                height={100}/>
            <button onClick={async () => await signOut()}>Sign out</button>
            <p>Current Streak: {counter}</p>
        </div>
    );
}

export default App;
