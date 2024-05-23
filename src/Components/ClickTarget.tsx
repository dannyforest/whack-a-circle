import styled from "styled-components";
import {useEffect, useState} from "react";
import Circle from "./Circle";
import axios from "axios";
import StyledShape from "./StyledShape";
import Diamond from "./Diamond";

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
    const [shapeColor, setShapeColor] = useState('red')

    useEffect(() => {
        setTimeout(() => {
            setDisplay('block');
        }, timeToDisplay);

        axios.get('https://psoz66kjhx6z43s3shwdhyxgra0mroqk.lambda-url.us-east-1.on.aws/')
            .then(res => {
                console.log(res.data);
                setShape(res.data.shape);
                setShapeColor(res.data.color)
            })

    }, []);

    useEffect(() => {
        setTimeout(() => {
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
            shapeObject = <StyledShape
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                backgroundColor={shapeColor}
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
                backgroundColor={shapeColor}
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
                backgroundColor={shapeColor}
            />
            break;
        default:
            shapeObject = <Diamond
                onClick={handleClick}
                display={display}
                top={getRandomTop()}
                left={getRandomLeft()}
                width={`${width}px`}
                height={`${height}px`}
                backgroundColor={shapeColor}
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