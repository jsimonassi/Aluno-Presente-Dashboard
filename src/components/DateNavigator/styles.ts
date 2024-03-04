import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
        font-size: 18px;
        color: ${props => props.theme.primary};
        font-family: "Light";
    }
`;

export const IconContainer = styled.div <DisableNavigationProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
    pointer-events: ${props => props.disabled ? "none" : "auto"};

    &:hover {
        cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    }
`;

interface DisableNavigationProps {
    disabled?: boolean;
}