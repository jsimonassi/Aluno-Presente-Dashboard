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
`;

export const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 16px;
`;


export const FooterInfos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;

    button {
        max-width: 200px;
        margin: 0;
    }
`;

