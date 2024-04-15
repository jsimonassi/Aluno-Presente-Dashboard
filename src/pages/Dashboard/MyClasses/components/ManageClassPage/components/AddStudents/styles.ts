import styled from "styled-components";


export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    max-width: 2000px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px 32px 24px 32px;
    box-sizing: border-box;
`;


export const SubTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;

    h2 {
        font-size: 20px;
        font-family: "bold";
        color: ${props => props.theme.primary};
    }
`;

export const AddBatchCounter = styled.p`
    font-size: 16px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.surface1};
    text-align: center;
    line-height: 32px;
`;