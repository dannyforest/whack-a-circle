import styled from "styled-components";
import StyledShape from "./StyledShape";

const Diamond = styled(StyledShape)<{
}>`
    transform: rotate(45deg);
`;

export default Diamond;