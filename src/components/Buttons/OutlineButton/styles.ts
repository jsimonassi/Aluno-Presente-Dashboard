import styled from "styled-components";

interface ButtonStyledProps {
    enabled?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 16px;
    border: 2px solid ${props => props.theme.primary};
    font-size: 20px;
    color: ${props => props.theme.primary };
    opacity: ${props => props.enabled ? 1 : 0.5};
    font-family: "Normal";
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: transparent;

    > img {
        width: 28px;
        margin-right: 10px;
    }


    &:hover {
        cursor: ${props => props.enabled ? "pointer" : "default"};
        opacity: ${props => props.enabled ? 0.8 : 0.5};
    }
`;