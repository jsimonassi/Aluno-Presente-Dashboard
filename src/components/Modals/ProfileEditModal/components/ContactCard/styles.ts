import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: ${props => props.theme.surface3};
    border-radius: 24px;
    padding: 8px 10px;
    box-sizing: border-box;
    margin-bottom: 8px;
`;

export const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 16px;
    color: ${props => props.theme.primary};

    h2 {
        font-size: 18px;
    }

    p {
        color: ${props => props.theme.primary};
        line-height: 16px;
        font-family: "light";        
    }
`;

export const CloseIconContainer = styled.div`
    display: flex;
    cursor: pointer;
    height: 100%;
    align-items: center;
`;