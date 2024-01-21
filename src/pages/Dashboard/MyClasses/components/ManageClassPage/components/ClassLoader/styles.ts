import styled from "styled-components";


export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px 32px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
`;
