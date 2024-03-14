import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${props => props.theme.surface3};
    border-radius: 24px;
    padding: 8px 10px;
    box-sizing: border-box;
`;

export const ButtonGroup = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    overflow-x: auto;

    button {
        min-width: 100px;
        height: 30px;
        font-size: 12px;
        margin: 0 5px;
        margin-bottom: 5px;
        border-radius: 16px;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const CloseIconContainer = styled.div`
    display: flex;
    cursor: pointer;
    height: 100%;
    align-items: end;
`;