import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Circle from "./Circle";
import Square from "./Square";
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
    const [display, setDisplay] = useState('block');
    const [shape, setShape] = useState('circle');
    const [position, setPosition] = useState({ top: '50%', left: '50%' });

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDisplay('block');  // Show the shape
            updatePosition();     // Update position when we are showing the shape
        }, timeToDisplay);

        axios.get('https://jdp6xckf2ktndnlddlgcctji5y0erdvq.lambda-url.us-east-1.on.aws/')
            .then(res => {
                console.log(res.data);
                setShape(res.data.shape);
            }).catch(err => console.error('Error fetching shape data:', err));

        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        if (display === 'block') {
            const visibilityTimer = setTimeout(() => {
                setDisplay('none');  // Hide the shape after the specified time
            }, timeToSwitch);
            return () => clearTimeout(visibilityTimer);
        } else {
            const reappearanceTimer = setTimeout(() => {
                setDisplay('block');  // Show the shape again
                updatePosition();     // Update position when we are showing the shape again
            }, timeToSwitch);
            return () => clearTimeout(reappearanceTimer);
        }
    }, [display, timeToSwitch]);

    const updatePosition = () => {
        setPosition({
            top: getRandomTop(),
            left: getRandomLeft()
        });
    };

    function getRandomTop() {
        const maxTop = window.innerHeight - height;
        return `${Math.floor(Math.random() * maxTop)}px`;
    }

    function getRandomLeft() {
        const maxLeft = window.innerWidth - width;
        return `${Math.floor(Math.random() * maxLeft)}px`;
    }

    const shapes = ["square", "circle", "diamond"];
    const currentShapeIndex = shapes.indexOf(shape);

    const handleShapeClick = () => {
        const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
        setShape(shapes[nextShapeIndex]);
        handleClick();
    };

    const shapeProps = {
        onClick: handleShapeClick,
        display: display === 'block' ? 'block' : 'none',
        top: position.top,
        left: position.left,
        width: `${width}px`,
        height: `${height}px`
    };

    let shapeObject;
    switch (shape) {
        case 'circle':
        shapeObject = <Circle {...shapeProps} />;
        break;

        case 'square':
            shapeObject = <Square {...shapeProps} />;
            break;

        case 'diamond':
            shapeObject = <Diamond {...shapeProps} />;
            break;

        default:
            shapeObject = null; // Handle unexpected shapes by not rendering anything
    }

    return <>{shapeObject}</>
};

export default ClickTarget;
