
import {useEffect, useState} from "react";
import Circle from "./Circle";
import axios from "axios";
import Square from "./Square";

import Diamond from "./Diamond";


interface ClickTargetProps {
    timeToDisplay?: number;
    timeToSwitch?: number;
    width?: number;
    height?: number;
    handleClick: () => void;
    resetCounter:()=> void;
}

const ClickTarget = ({
                         handleClick,
                         resetCounter,
                         timeToDisplay = 1000,
                         timeToSwitch = 1000,
                         height = 100,
                         width = 100
                     }: ClickTargetProps) => {
    const [display, setDisplay] = useState('none');
    const [shape, setShape] = useState('circle');
    const [color, setColor] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setDisplay('block');
        }, timeToDisplay);

        axios.get('https://qv43rmtywsr7ofqmiliymwcd4a0htbbi.lambda-url.us-east-1.on.aws/')
            .then(res => {
                console.log(res.data);
                setShape(res.data.shape);
                setColor(res.data.color);
            })

    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (display === 'block')
                resetCounter();
            setDisplay(display === 'none' ? 'block' : 'none');
        }, timeToSwitch);
    }, [display]);

    const getRandomTop = () => {
        const maxTop = window.innerHeight - height;
        return `${Math.floor(Math.random() * maxTop)}px`;
    };

    const getRandomLeft = () => {
        const maxLeft = window.innerWidth - width;
        return `${Math.floor(Math.random() * maxLeft)}px`;
    };

    // const shapes = {
    //     square: <Square
    //         onClick={handleClick}
    //         display={display}
    //         top={getRandomTop()}
    //         left={getRandomLeft()}
    //         width={`${width}px`}
    //         height={`${height}px`}
    //     />,
    //     circle: <Circle
    //         onClick={handleClick}
    //         display={display}
    //         top={getRandomTop()}
    //         left={getRandomLeft()}
    //         width={`${width}px`}
    //         height={`${height}px`}
    //     />,
    //     diamond: <Diamond
    //         onClick={handleClick}
    //         display={display}
    //         top={getRandomTop()}
    //         left={getRandomLeft()}
    //         width={`${width}px`}
    //         height={`${height}px`}
    //     />,
    //     triangle: <Diamond
    //         onClick={handleClick}
    //         display={display}
    //         top={getRandomTop()}
    //         left={getRandomLeft()}
    //         width={`${width}px`}
    //         height={`${height}px`}
    //     />
    // }

    // @ts-ignore
    // return (
    //     <>
    //         {shapes[shape]}
    //     </>
    // )

    let shapeObject;
    switch (shape) {
        case 'square':
            shapeObject = <Square
                onClick={handleClick}
                backgroundColor={color}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
            />
            break;
        case 'circle':
            shapeObject = <Circle
                onClick={handleClick}
                backgroundColor={color}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
            />
            break;
        case 'diamond':
            shapeObject = <Diamond
                onClick={handleClick}
                backgroundColor={color}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
            />
            break;
        default:
            shapeObject = <Diamond
                onClick={handleClick}
                backgroundColor={color}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
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