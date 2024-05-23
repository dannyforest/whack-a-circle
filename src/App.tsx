import React, {useEffect, useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
import {signOut} from "@aws-amplify/auth";
import { DataStore } from 'aws-amplify/datastore';
import {UserScore} from "./models";
import { getCurrentUser } from 'aws-amplify/auth';
import styled from "styled-components";

function App() {
    const [counter, setCounter] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [name, setName] = useState('Danny');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        getCurrentUser().then(({userId}) => {
            setUserId(userId);
            loadAndSetHighestScore(userId).then();
        })
    }, []);

    const getLastUserScore = async (userId: string): Promise<UserScore | null> => {
        const userScores  = await DataStore.query(UserScore, (c) => c.userId.eq(userId));
        return userScores.length > 0 ? userScores[userScores.length - 1] : null;
    }

    const loadAndSetHighestScore = async (userId: string) => {
        const original = await getLastUserScore(userId);
        if (original) {
            setHighestScore(original.score);
        }
    }

    const handleClick = async () => {
        setCounter(counter + 1);
        if (counter + 1 > highestScore) {
            setHighestScore(counter + 1);
        }

        if (!userId) return;

        const original = await getLastUserScore(userId);
        if (original && original.score > highestScore) {
            await DataStore.save(
                UserScore.copyOf(original, updated => {
                    updated.score = counter + 1
                })
            );
        } else {
            await DataStore.save(new UserScore({userId: userId, name: name, score: counter + 1}));
        }
    }

    const resetCounter = () => {
        setCounter(0);
    }

    return (
        <div className="App">
            <BackDiv
                onClick={() => resetCounter()}
            />
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                resetCounter={resetCounter}
                handleClick={async () => await handleClick()} />
            <button onClick={async () => await signOut()}>Sign out</button>
            <p>Current Score: {counter}</p>
            <p>Highest Score: {highestScore}</p>
        </div>
    );
}

export default App;

const BackDiv = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;
