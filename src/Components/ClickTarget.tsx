import styled from "styled-components";
import {useEffect, useState} from "react";
import Circle from "./Circle";
import axios from "axios";
import Square from "./Square";
import Diamond from "./Diamond";
import Triangle from "./Triangle";

interface ClickTargetProps {
    timeToDisplay?: number;
    timeToSwitch?: number;
    width?: number;
    height?: number;
    handleClick: () => void;
}


const ClickTarget = ({
                         handleClick,
                         timeToDisplay = 1000,
                         timeToSwitch = 1000,
                         height = 100,
                         width = 100
                     }: ClickTargetProps) => {
    const [display, setDisplay] = useState('none');
    const [shape, setShape] = useState('circle');

    useEffect(() => {
        setTimeout(() => {
            setDisplay('block');
        }, timeToDisplay);

        axios.get('https://4z6v3yrw4g4adu37ay3bnyqshe0tzapq.lambda-url.us-east-1.on.aws/')
            .then(res => {
                console.log(res.data);
                setShape(res.data.shape);
            })

    }, []);

    useEffect(() => {
        setTimeout(() => {
            setDisplay(display === 'none' ? 'block' : 'none');
        }, timeToSwitch);
    }, [display]);

    const getRandomTop = () => {
        const maxTop = window.innerHeight - (height + 80);
        return `${Math.floor(Math.random() * maxTop)}px`;
    };

    const getRandomLeft = () => {
        const maxLeft = window.innerWidth - (width + 80);
        return `${Math.floor(Math.random() * maxLeft)}px`;
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    let shapeObject;
    switch (shape) {
        case 'square':
            shapeObject = <Square
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                color={getRandomColor()}
            />
            break;
        case 'circle':
            shapeObject = <Circle
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                color={getRandomColor()}
            />
            break;
        case 'diamond':
            shapeObject = <Diamond
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                color={getRandomColor()}
            />
            break;
        case 'triangle':
            shapeObject = <Triangle
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                color={getRandomColor()}/>
            break;

        default:
            shapeObject = <Diamond
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                color={getRandomColor()}
            />
    }

    return (
        <>
            {shapeObject}
        </>
    )

    // return (
    //     shape === 'square' ?
    //         <StyledShape
    //             onClick={handleClick}
    //             display={display}
    //             top={getRandomTop()}
    //             left={getRandomLeft()}
    //             width={`${width}px`}
    //             height={`${height}px`}
    //         /> :
    //         <Circle
    //             onClick={handleClick}
    //             display={display}
    //             top={getRandomTop()}
    //             left={getRandomLeft()}
    //             width={`${width}px`}
    //             height={`${height}px`}
    //         />
    /*
    <>
      {shape === 'square' && (
        <Square
          onClick={onClick}
          display={display}
          top={top}
          left={left}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}
      {shape === 'circle' && (
        <Circle
          onClick={onClick}
          display={display}
          top={top}
          left={left}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}
      {shape === 'triangle' && (
        <Triangle
          onClick={onClick}
          display={display}
          top={top}
          left={left}
          width={width}
          height={height}
        />
      )}
      {shape === 'diamond' && (
        <Diamond
          onClick={onClick}
          display={display}
          top={top}
          left={left}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}
    </>
     */
    // )
}

export default ClickTarget;