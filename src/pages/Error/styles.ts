import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.primary};
    height: 100vh;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 16px;
    width: 30%;
    min-width: 300px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    color: ${props => props.theme.primary};
    text-align: center;

    h1 {
        font-size: 80px;
        font-family: "Bold";
    }

    p {
        font-size: 18px;
        font-family: "Normal";
    }

`;

