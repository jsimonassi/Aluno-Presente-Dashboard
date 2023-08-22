import styled from "styled-components";

export const BigButtonStyled = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.surface2 };
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
    
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