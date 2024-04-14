import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 32px;
    box-sizing: border-box;
    align-items: center;

    img {
        height: 120px;
    }
`;

export const VersionContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 50%;
    text-align: center;
    margin-top: 32px;
    margin-bottom: 32px;
    color: ${props => props.theme.primary};
    height: 100px;
    justify-content: space-between;
    font-family: "Light";
`;

export const DevsContainer = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        color: ${props => props.theme.primary};
        font-size: 20px;
        text-align: center;
        margin-bottom: 16px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    margin-top: 24px;
    width: 25%;
    min-width: 250px;
`;