import styled from "styled-components";

export const BigButtonStyled = styled.div<BigButtonProps>`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.selected ? props.theme.surface3 : props.theme.surface2};
    border-radius: 16px;
    padding: 16px;
    border: ${props => props.selected ? `0.5px solid ${props.theme.surface2}` : "none"};
    
    h3 {
        color: ${props => props.theme.primary};
        font-size: 16px;
    }

    p {
        font-size: 14px;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

interface BigButtonProps {
    selected?: boolean;
}