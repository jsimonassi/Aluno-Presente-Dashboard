import styled from "styled-components";

export const StackContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;
    margin-right: 10px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    flex-direction: row;
    height: 50px;
    width: 75px;
    margin-left: 5px;

    &:hover {
        cursor: pointer;
    }

    img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    > div {
        display: flex;
        width: 30%;
    }

    p {
        color: ${props => props.theme.primary};
    }
`;

export const SpacingContainer = styled.div`
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-top: 50px;
    width: 200px;
    padding-top: 10px;
    margin-left: -110px;
`;


export const OpenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.surface1};
    width: 180px;
    border-radius: 16px;
    padding: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
`;

export const DropdownItem = styled.div`
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 5px;
        border-radius: 8px;
        height: 45px;
        padding: 4px;

        &:hover {
            cursor: pointer;
            background-color: ${props => props.theme.surface2};
        }
    }

    hr {
        width: 90%;
        opacity: 0.5;
        margin-top: 5px;
        margin-bottom: 5px;
        display: block; 
        height: 1px;
        border: 0; 
        border-top: 1px solid ${props => props.theme.primary};
        padding: 0;
    }

    p {
        color: ${props => props.theme.primary};
        font-family: "Normal";
    }

    img {
        height: 30px;
        width: 30px;
        object-fit: cover;
    }
`; 
