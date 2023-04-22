import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.surface1};
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    min-height: 300px;
    align-items: center;

    img {
        width: 40%;
        max-width: 180px;
    }

    h2 {
        color: ${({ theme }) => theme.primary};
        margin-top: 3%;
    }

    > p {
        margin-top: 5%;
        color: ${({ theme }) => theme.primary};
        text-decoration: underline;
        font-size: 14px;

        &:hover {
            cursor: pointer;
        }
    }
`;

export const RegisterBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 5%;

    p {
        color: ${({ theme }) => theme.primary};
        font-size: 14px;
    }

    &:hover {
            cursor: pointer;
        }
`;

