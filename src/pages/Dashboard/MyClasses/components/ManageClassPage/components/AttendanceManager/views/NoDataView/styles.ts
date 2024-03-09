import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    max-width: 2000px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px;
    box-sizing: border-box;
`;

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    h3 {
        color: ${props => props.theme.primary};
    }

    img {
        max-width: 350px
    }

    p {
        font-size: 18px;
        color: ${props => props.theme.secondaryText};
        font-family: "Light";
        text-align: center;
    }
`;