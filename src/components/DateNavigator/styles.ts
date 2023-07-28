import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
        font-size: 18px;
        color: ${props => props.theme.primary};
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;