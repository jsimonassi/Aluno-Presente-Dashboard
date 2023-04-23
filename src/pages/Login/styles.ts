import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.primary};
`;

export const ContainerMobile = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.primary};

    > div {
        border-radius: 32px;
        height: 60%;
        min-height: 500px;
    }
`;