import styled from "styled-components";

export const StackContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: -8px;

    p {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
        margin-left: 10px;
        color: ${props => props.theme.primary};
    }
`;

interface InfoBoxProps {
    visible: boolean
}

export const InfoBoxContainer = styled.div<InfoBoxProps>`
    display: ${props => props.visible ? "flex" : "none"};
    position: absolute;
    margin-top: 130px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;

    h1{
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
        margin-left: 10px;
        color: ${props => props.theme.primary};
    }
`;

export const InputStyled = styled.input`
    display: flex;
`;

export const InputContainer = styled.div`
 
    display: flex;
    border-radius: 16px;
    background-color: ${props => props.theme.background};
    height: 45px;
`;

export const TimeInputStyled = styled.input`
    border: none;
    box-sizing: border-box;
    outline: 0;
    padding: .75rem;
    position: relative;
    width: 100%;
    justify-content: center;
    height: 45px;
    background-color: transparent;

    ::-webkit-datetime-edit { font-size: 18px; color: ${props => props.theme.textColor};  font-family: "Normal"; }
    ::-webkit-calendar-picker-indicator { 
        background:  transparent;
        opacity: 0;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
        }

`;

export const OverText = styled.h1`
    display: flex;
    position: absolute;
    background-color: blue;
    width: 100px;
    height: 100px;
`;



