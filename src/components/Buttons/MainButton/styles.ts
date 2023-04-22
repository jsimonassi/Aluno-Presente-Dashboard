import styled from "styled-components";

interface ButtonStyledProps {
    enabled?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 32px;
    background-color: ${props => props.theme.primary};
    font-size: 18px;
    color: ${props => props.theme.whiteText };
    margin-top: 4%;
    opacity: ${props => props.enabled ? 1 : 0.5};
    font-family: "Normal";


    &:hover {
        cursor: ${props => props.enabled ? "pointer" : "default"};
        opacity: ${props => props.enabled ? 0.8 : 0.5};
    }
`;