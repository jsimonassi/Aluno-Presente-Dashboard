import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 350px; */
    min-width: 300px;
    height: 170px;
    background-color: ${props => props.theme.surface2};
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
    justify-content: space-between;
    transition: 0.5s;
    margin: 8px;

    &:hover {
        scale: 1.05;
        transition: 0.5s;
        cursor: pointer;
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Infos = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 18px;
        color: ${props => props.theme.primary};
    }

    span {
        font-size: 12px;
        color: ${props => props.theme.secondaryText};
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;

    img {
        margin-right: 8px;

        &:hover {
            opacity: 0.5;
        }
    }
`;

