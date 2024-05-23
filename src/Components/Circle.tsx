import styled from "styled-components";
import StyledShape from "./StyledShape";

const Circle = styled(StyledShape)<{
    display: string;
    top: string;
    left: string;
    width: string;
    height: string;
    backgroundColor: string;
}>`
    border-radius: 50%;
`;

export default Circle;