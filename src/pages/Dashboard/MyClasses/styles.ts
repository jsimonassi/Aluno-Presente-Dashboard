import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 32px;
    box-sizing: border-box;
`;

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    > img {
        max-width: 350px;
    }

    > h1 {
        font-size: 24px;
        font-weight: 600;
        color: ${props => props.theme.primary};
        margin-top: 10px;
    }

    > p {
        font-size: 16px;
        font-family: "light";
        color: ${props => props.theme.secondaryText};
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    justify-content: center;
`;

export const AllClassContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;