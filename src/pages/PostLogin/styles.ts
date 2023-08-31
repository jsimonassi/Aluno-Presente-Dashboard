import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.backgroundPage};
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.backgroundCard};
    border-radius: 16px;
    width: 40%;
    height: 20%;
    justify-content: space-around;
    min-width: 400px;
    padding-top: 20px;

    img {
        width: 40%;
        max-height: 150px;
        object-fit: contain;
    }
`;