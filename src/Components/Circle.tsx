import styled from "styled-components";
import StyledShape from "./StyledShape";

const Circle = styled(StyledShape)<{
    backgroundColor:string,
    display: string;
    top: string;
    left: string;
    width: string;
    height: string;
}>`
    border-radius: 50%;
`;

export default Circle;