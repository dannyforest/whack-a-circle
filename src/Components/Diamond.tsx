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

const Diamond = styled(StyledShape)<{
    display: string;
    top: string;
    left: string;
    width: string;
    height: string;
}>`
  transform: rotate(45deg);
  background-color: ${() => getRandomColor()};
`;

export default Diamond;
