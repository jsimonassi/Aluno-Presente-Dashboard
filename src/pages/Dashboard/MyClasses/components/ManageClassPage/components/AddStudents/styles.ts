import styled from "styled-components";


export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px 32px 24px 32px;
    box-sizing: border-box;

    h1 {
        font-size: 20px;
        font-family: "bold";
        color: ${props => props.theme.primary};
    }
`;

export const BigButton = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.surface2 };
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
    
    h3 {
        color: ${props => props.theme.primary};
        font-size: 16px;
    }

    p {
        font-size: 14px;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;