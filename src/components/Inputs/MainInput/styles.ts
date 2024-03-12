import styled from "styled-components";

interface ITagInputProps {
    rowsNumber?: number
    disabled?: boolean
    isError?: boolean
}

export const StackContainer = styled.div<ITagInputProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: ${props => props.disabled ? 0.5 : 1};

    h1{
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
        margin-left: 10px;
        color: ${props => props.theme.primary};
    }

    span {
        color: ${props => props.theme.error};
        font-size: 12px;
        margin-left: 8px;
        margin-top: -5px;
        margin-bottom: 10px;
        font-family: "Normal";
    }
`;

export const TextAreaStyled = styled.textarea<ITagInputProps>`
    display: flex;
    align-items: flex-start;
    height: ${props => props?.rowsNumber ? props.rowsNumber * 40 : 40}px;
    width: 100%;
    border: ${props => props.isError ? `1px solid ${props.theme.error}` : "none"};
    outline: none;
    color: ${props => props.theme.primary};
    font-size: 16px;
    background-color: ${props => props.theme.background};
    border-radius: 32px;
    box-sizing: border-box;
    padding: 10px;
    resize: none;
    font-family: "Normal";
    margin-bottom: 10px;
    ::placeholder {
        color: ${props => props.theme.primary};
        opacity: 0.5;
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const InputStyled = styled.input<ITagInputProps>`
    display: flex;
    align-items: flex-start;
    height: 45px;
    width: 100%;
    border: ${props => props.isError ? `1px solid ${props.theme.error}` : "none"};
    outline: none;
    color: ${props => props.theme.primary};
    font-size: 16px;
    background-color: ${props => props.disabled? props.theme.secondaryText : props.theme.background};
    border-radius: 32px;
    box-sizing: border-box;
    padding-left: 10px;
    font-family: "Normal";
    ::placeholder {
        color: ${props => props.theme.primary};
        opacity: 0.5;
    }


    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;


export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const LoaderContainer = styled.div`
    display: flex;
    width: 30px;
    justify-content: center;
    align-items: center;
    padding-top: 6px;
    margin-left: -40px;
`;    