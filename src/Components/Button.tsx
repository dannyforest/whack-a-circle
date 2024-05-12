import styled from 'styled-components';

const Button = styled.button<{
    padding?: string;
    fontSize?: string;
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    cursor?: string;
    transition?: string;
}>`
    padding: ${props => props.padding };
    font-size: ${props => props.fontSize };
    background-color: ${props => props.backgroundColor };
    color: ${props => props.color };
    border: ${props => props.border };
    border-radius: ${props => props.borderRadius };
    cursor: ${props => props.cursor };
    transition: ${props => props.transition  };
    
`;


export default Button;