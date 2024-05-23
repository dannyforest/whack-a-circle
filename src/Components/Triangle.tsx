import styled from "styled-components";

interface TriangleProps {
    onClick: () => void;
    display: string;
    top: string;
    left: string;
    width: string;
    height: string;
    color: string;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const TriangleContainer = styled.div<TriangleProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 0;
  height: 0;
  border-top: ${(props) => props.height} solid transparent;
  border-right: ${(props) => props.width} solid transparent;
  border-bottom: ${(props) => props.height} solid ${(props) => props.color};
  display: ${(props) => props.display};
  cursor: pointer;
`;

const Triangle: React.FC<TriangleProps> = ({
                                               onClick,
                                               display,
                                               top,
                                               left,
                                               width,
                                               height,
                                           }) => {
    const randomColor = getRandomColor();

    return (
        <TriangleContainer
            onClick={onClick}
            display={display}
            top={top}
            left={left}
            width={width}
            height={height}
            color={randomColor}
        />
    );
};

export default Triangle;
