import React, {useEffect, useState} from 'react';
import './App.css';
import ClickTarget from "./Components/ClickTarget";
import {signOut} from "@aws-amplify/auth";
import { DataStore } from 'aws-amplify/datastore';
import {UserScore} from "./models";
import { getCurrentUser } from 'aws-amplify/auth';
import styled from "styled-components";
import GameButton from "./Components/GameButton";
import Button from "./Components/Button";

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
    const handleReset=()=>{
        setCounter(0);
    }
    return (
        <div className="App">
            <BackDiv
                onClick={() => handleReset()}
            />
            <ClickTarget
                timeToDisplay={1000}
                timeToSwitch={1500}
                resetCounter ={() => handleReset()}
                handleClick={() => handleClick()}/>
            <GameButton handleReset={() => handleReset()}/>
            <Button onClick={async () => await signOut()}>Sign out</Button>
            <p>Current Score: {counter}</p>
            <p>Highest Score: {highestScore}</p>
            <p>{counter}</p>
        </div>
    );
}

export default App;
const BackDiv = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;