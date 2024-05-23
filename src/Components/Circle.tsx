import styled from "styled-components";
import StyledShape from "./StyledShape";


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Circle = styled(StyledShape)<{
    display: string;
    top: string;
    left: string;
    width: string;
    height: string;
}>`
  border-radius: 50%;
  background-color: ${() => getRandomColor()};
`;

export default Circle;
