import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;

    img {
        width: 30%;
        max-width: 180px;
    }
`;

export const InfoStack = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 5%;

    h1 {
        color: ${({ theme }) => theme.whiteText};
    }

    p {
        color: ${({ theme }) => theme.secondaryText};
        max-width: 400px;
    }
`;
